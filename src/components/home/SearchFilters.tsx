import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Price</SelectItem>
                <SelectItem value="0-50000">Under 50k FCFA</SelectItem>
                <SelectItem value="50000-200000">50k - 200k FCFA</SelectItem>
                <SelectItem value="200000-1000000">200k - 1M FCFA</SelectItem>
                <SelectItem value="1000000+">Above 1M FCFA</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
          {categoryFilter !== 'all' && (
            <Badge variant="secondary" className="h-6">
              {CATEGORIES.find((c) => c.id === categoryFilter)?.name}
              <button className="ml-2" onClick={() => setCategoryFilter('all')}>×</button>
            </Badge>
          )}
          {locationFilter !== 'All Locations' && (
            <Badge variant="secondary" className="h-6">
              {locationFilter}
              <button className="ml-2" onClick={() => setLocationFilter('All Locations')}>×</button>
            </Badge>
          )}
          {priceRange !== 'all' && (
            <Badge variant="secondary" className="h-6">
              {priceRange}
              <button className="ml-2" onClick={() => setPriceRange('all')}>×</button>
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};