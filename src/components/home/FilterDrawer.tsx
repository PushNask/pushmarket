import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterDrawerProps {
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

export const FilterDrawer = ({
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
}: FilterDrawerProps) => {
  const activeFiltersCount = [
    categoryFilter !== 'all',
    locationFilter !== 'All Locations',
    priceRange !== 'all',
  ].filter(Boolean).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="category">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="location">
              <AccordionTrigger>Location</AccordionTrigger>
              <AccordionContent>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="0-50000">Under 50k FCFA</SelectItem>
                    <SelectItem value="50000-200000">50k - 200k FCFA</SelectItem>
                    <SelectItem value="200000-1000000">200k - 1M FCFA</SelectItem>
                    <SelectItem value="1000000+">Above 1M FCFA</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sort">
              <AccordionTrigger>Sort By</AccordionTrigger>
              <AccordionContent>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Active Filters */}
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {categoryFilter !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {CATEGORIES.find((c) => c.id === categoryFilter)?.name}
                <button 
                  onClick={() => setCategoryFilter('all')}
                  className="ml-1 hover:bg-secondary rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {locationFilter !== 'All Locations' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {locationFilter}
                <button 
                  onClick={() => setLocationFilter('All Locations')}
                  className="ml-1 hover:bg-secondary rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {priceRange !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {priceRange}
                <button 
                  onClick={() => setPriceRange('all')}
                  className="ml-1 hover:bg-secondary rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};