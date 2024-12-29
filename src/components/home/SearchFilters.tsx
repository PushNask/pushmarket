import { Search } from 'lucide-react';
import { FilterDrawer } from './FilterDrawer';

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
        <div className="flex items-center gap-3">
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

          {/* Filter Drawer */}
          <FilterDrawer
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
        </div>
      </div>
    </div>
  );
};