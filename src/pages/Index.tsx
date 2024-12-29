import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import ReactPaginate from 'react-paginate';

import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Package,
  Clock,
  Tag,
  MapPin
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import SkeletonCard from '@/components/SkeletonCard';
import { ProductCard } from '@/components/ProductCard';

// Example category & location arrays
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

// Mock service function
async function fetchPermanentLinks() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return Array.from({ length: 120 }, (_, i) => ({
    id: `${i + 1}`,
    linkNumber: i + 1,
    category: Math.random() > 0.5 ? 'electronics' : 'fashion',
    location: Math.random() > 0.5 ? 'Douala' : 'Yaoundé',
    title: `Product ${i + 1}`,
    description: 'Some product description...',
    price: Math.floor(Math.random() * 1000000) + 100000,
    currency: 'XAF',
    images: Array(5).fill('/placeholder.svg'),
    approvedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    metrics: {
      linkScore: Math.floor(Math.random() * 100),
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 100),
    },
  }));
}

export default function Index() {
  // Filter states
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  // Debounce the search input
  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchQuery(value), 500),
    []
  );

  // Whenever searchInput changes, call the debounced function
  useEffect(() => {
    debouncedSearch(searchInput);
  }, [searchInput, debouncedSearch]);

  // React Query: Fetch products
  const { data: links = [], isLoading, error } = useQuery(
    ['permanentLinks'],
    fetchPermanentLinks,
    {
      staleTime: 5 * 60 * 1000, // keep data fresh for 5 minutes
      select: (items) => {
        let filtered = [...items];

        // 1) Category filter
        if (categoryFilter !== 'all') {
          filtered = filtered.filter((p) => p.category === categoryFilter);
        }

        // 2) Location filter
        if (locationFilter !== 'All Locations') {
          filtered = filtered.filter((p) => p.location === locationFilter);
        }

        // 3) Price Range
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

        // 4) Search text
        if (searchQuery) {
          const lowerQuery = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (p) =>
              p.title.toLowerCase().includes(lowerQuery) ||
              p.description.toLowerCase().includes(lowerQuery)
          );
        }

        // 5) Sort By
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
    }
  );

  // Separate featured (top 12 by linkScore) from the rest
  const featuredLinks = useMemo(() => {
    const sortedByScore = [...links].sort((a, b) => b.metrics.linkScore - a.metrics.linkScore);
    return sortedByScore.slice(0, 12);
  }, [links]);

  // The "remaining" after the featured
  const remainingLinks = useMemo(() => {
    const featuredIDs = featuredLinks.map((f) => f.id);
    return links.filter((link) => !featuredIDs.includes(link.id));
  }, [links, featuredLinks]);

  // Pagination for the main grid
  const pageCount = Math.ceil(remainingLinks.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = remainingLinks.slice(offset, offset + itemsPerPage);

  // Handle page changes
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Error handling
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">
          Error loading products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white w-full py-10 mb-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome to PushNshop Marketplace</h1>
          <p className="text-lg sm:text-xl opacity-90">
            The trusted marketplace for buyers and sellers in Cameroon
          </p>
          <div className="flex items-center justify-center gap-4 text-sm sm:text-base mt-4">
            <span className="flex items-center">
              <Package className="w-4 h-4 mr-1" />
              120 Premium Slots
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Real-time Updates
            </span>
            <span className="flex items-center">
              <Tag className="w-4 h-4 mr-1" />
              Best Deals
            </span>
          </div>
        </div>
      </section>

      {/* Search & Filters Bar */}
      <div className="sticky top-0 z-20 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Price</SelectItem>
                <SelectItem value="0-50000">Under 50,000 FCFA</SelectItem>
                <SelectItem value="50000-200000">50k - 200k FCFA</SelectItem>
                <SelectItem value="200000-1000000">200k - 1M FCFA</SelectItem>
                <SelectItem value="1000000+">Above 1M FCFA</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Additional Filters Button */}
            <Button variant="outline" className="ml-auto">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Active Filter Badges */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {categoryFilter !== 'all' && (
              <Badge variant="secondary">
                Category: {CATEGORIES.find((c) => c.id === categoryFilter)?.name}
                <button className="ml-2" onClick={() => setCategoryFilter('all')}>×</button>
              </Badge>
            )}
            {locationFilter !== 'All Locations' && (
              <Badge variant="secondary">
                Location: {locationFilter}
                <button className="ml-2" onClick={() => setLocationFilter('All Locations')}>×</button>
              </Badge>
            )}
            {priceRange !== 'all' && (
              <Badge variant="secondary">
                Price: {priceRange}
                <button className="ml-2" onClick={() => setPriceRange('all')}>×</button>
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* Featured Section */}
            {featuredLinks.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Featured Products</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <div className="flex gap-4">
                    {featuredLinks.map((link) => (
                      <div key={link.id} className="min-w-[300px] flex-shrink-0">
                        <ProductCard {...link} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* All Products */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">All Products</h2>
                <span className="text-sm text-gray-500">
                  Showing {currentItems.length} of {remainingLinks.length} products
                </span>
              </div>

              {currentItems.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentItems.map((link) => (
                    <ProductCard key={link.id} {...link} />
                  ))}
                </div>
              )}

              {/* Pagination */}
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
                    onPageChange={handlePageChange}
                    containerClassName="flex items-center space-x-3"
                    pageClassName="px-3 py-1 border rounded"
                    activeClassName="bg-blue-500 text-white"
                    previousClassName="inline-block"
                    nextClassName="inline-block"
                    disabledClassName="opacity-50 cursor-not-allowed"
                  />
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
