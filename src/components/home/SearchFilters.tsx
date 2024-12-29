import { Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface SearchFiltersProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  CATEGORIES: Array<{ id: string; name: string }>;
  LOCATIONS: string[];
}

export const SearchFilters = ({
  searchInput,
  setSearchInput,
  categoryFilter,
  setCategoryFilter,
  locationFilter,
  setLocationFilter,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  CATEGORIES,
  LOCATIONS,
}: SearchFiltersProps) => {
  return (
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
  );
};
