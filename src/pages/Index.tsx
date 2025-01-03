import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SkeletonCard from '@/components/SkeletonCard';
import { HeroBanner } from '@/components/home/HeroBanner';
import { SearchFilters } from '@/components/home/SearchFilters';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { ProductGrid } from '@/components/home/ProductGrid';
import { fetchPermanentLinks } from '@/services/product.service';

const CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  { id: 'electronics', name: 'Electronics & Gadgets' },
  { id: 'vehicles', name: 'Vehicles' },
  { id: 'property', name: 'Property' },
  { id: 'fashion', name: 'Fashion & Beauty' },
  { id: 'home', name: 'Home & Garden' },
  { id: 'services', name: 'Services' }
];

const LOCATIONS = [
  'All Locations',
  'Douala',
  'Yaoundé',
  'Bamenda',
  'Bafoussam',
  'Garoua',
  'Maroua'
];

export default function Index() {
  // Filter states
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearchQuery(value), 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchInput);
  }, [searchInput, debouncedSearch]);

  const { data: links = [], isLoading } = useQuery({
    queryKey: ['permanentLinks'],
    queryFn: fetchPermanentLinks,
    staleTime: 5 * 60 * 1000,
    select: (items) => {
      let filtered = [...items];

      if (categoryFilter !== 'all') {
        filtered = filtered.filter((p) => p.category === categoryFilter);
      }

      if (locationFilter !== 'All Locations') {
        filtered = filtered.filter((p) => p.location === locationFilter);
      }

      if (priceRange !== 'all') {
        if (priceRange.includes('-')) {
          const [min, max] = priceRange.split('-').map(Number);
          filtered = filtered.filter(
            (p) => p.price >= min && p.price <= max
          );
        } else if (priceRange.endsWith('+')) {
          const min = parseInt(priceRange);
          filtered = filtered.filter((p) => p.price >= min);
        }
      }

      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery)
        );
      }

      switch (sortBy) {
        case 'newest':
          filtered.sort((a, b) => 
            new Date(b.approvedAt).getTime() - new Date(a.approvedAt).getTime()
          );
          break;
        case 'popular':
          filtered.sort((a, b) => b.metrics.linkScore - a.metrics.linkScore);
          break;
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
      }

      return filtered;
    },
  });

  const featuredLinks = useMemo(() => {
    const sortedByScore = [...links].sort((a, b) => b.metrics.linkScore - a.metrics.linkScore);
    return sortedByScore.slice(0, 12);
  }, [links]);

  const remainingLinks = useMemo(() => {
    const featuredIDs = featuredLinks.map((f) => f.id);
    return links.filter((link) => !featuredIDs.includes(link.id));
  }, [links, featuredLinks]);

  const pageCount = Math.ceil(remainingLinks.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = remainingLinks.slice(offset, offset + itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <HeroBanner />
      
      <SearchFilters
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        CATEGORIES={CATEGORIES}
        LOCATIONS={LOCATIONS}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            <FeaturedProducts products={featuredLinks} />
            <ProductGrid products={currentItems} totalCount={remainingLinks.length} />

            {remainingLinks.length > itemsPerPage && (
              <div className="flex justify-center mt-8 gap-2">
                <ReactPaginate
                  previousLabel={
                    <Button variant="outline">
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  }
                  nextLabel={
                    <Button variant="outline">
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  }
                  pageCount={pageCount}
                  onPageChange={({ selected }) => setCurrentPage(selected)}
                  containerClassName="flex items-center space-x-3"
                  pageClassName="px-3 py-1 border rounded"
                  activeClassName="bg-blue-500 text-white"
                  previousClassName="inline-block"
                  nextClassName="inline-block"
                  disabledClassName="opacity-50 cursor-not-allowed"
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}