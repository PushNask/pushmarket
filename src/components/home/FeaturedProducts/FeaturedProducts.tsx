import { useState, useEffect, useCallback } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { Navigation } from './Navigation';
import { PageIndicators } from './PageIndicators';
import { FeaturedProductsProps } from './types';
import SkeletonCard from '@/components/SkeletonCard';

const PRODUCTS_PER_PAGE = 4;

export const FeaturedProducts = ({
  products,
  isLoading,
  autoRotateInterval = 5000
}: FeaturedProductsProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const currentProducts = products.slice(
    currentPage * PRODUCTS_PER_PAGE,
    (currentPage + 1) * PRODUCTS_PER_PAGE
  );

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const previousPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (isLoading || isPaused || !autoRotateInterval || totalPages <= 1) return;
    const interval = setInterval(nextPage, autoRotateInterval);
    return () => clearInterval(interval);
  }, [nextPage, isLoading, isPaused, autoRotateInterval, totalPages]);

  if (!products.length && !isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">
        No featured products available
      </div>
    );
  }

  return (
    <section 
      className="py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <Navigation
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={nextPage}
          onPrevious={previousPage}
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <SkeletonCard />
              </div>
            ))
          : currentProducts.map((product) => (
              <div 
                key={product.id}
                className="transform transition-all duration-300 hover:scale-[1.02]"
              >
                <ProductCard 
                  {...product} 
                  currency={product.currency || 'XAF'}
                />
              </div>
            ))}
      </div>

      <PageIndicators
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};