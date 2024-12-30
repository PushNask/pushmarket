import { useState, useEffect, useCallback, useRef } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { Navigation } from './Navigation';
import { PageIndicators } from './PageIndicators';
import { FeaturedProductsProps } from './types';
import { SkeletonCard } from '@/components/ui/skeleton';

const PRODUCTS_PER_PAGE = {
  mobile: 1,    // < 640px
  tablet: 2,    // >= 640px
  desktop: 4    // >= 1024px
};

export const FeaturedProducts = ({
  products,
  isLoading = false,
  autoRotateInterval = 0
}: FeaturedProductsProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(PRODUCTS_PER_PAGE.mobile);
  const autoRotateTimeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Update products per page based on screen size
  useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setProductsPerPage(PRODUCTS_PER_PAGE.desktop);
      } else if (window.innerWidth >= 640) {
        setProductsPerPage(PRODUCTS_PER_PAGE.tablet);
      } else {
        setProductsPerPage(PRODUCTS_PER_PAGE.mobile);
      }
    };

    updateProductsPerPage();
    window.addEventListener('resize', updateProductsPerPage);
    return () => window.removeEventListener('resize', updateProductsPerPage);
  }, []);

  // Auto-rotation logic
  useEffect(() => {
    if (autoRotateInterval > 0 && products.length > productsPerPage) {
      const startAutoRotate = () => {
        autoRotateTimeoutRef.current = setInterval(() => {
          setCurrentPage(prev => 
            prev === Math.ceil(products.length / productsPerPage) - 1 ? 0 : prev + 1
          );
        }, autoRotateInterval);
      };

      startAutoRotate();

      return () => {
        if (autoRotateTimeoutRef.current) {
          clearInterval(autoRotateTimeoutRef.current);
        }
      };
    }
  }, [autoRotateInterval, products.length, productsPerPage]);

  // Pause auto-rotation on hover/touch
  const handleMouseEnter = () => {
    if (autoRotateTimeoutRef.current) {
      clearInterval(autoRotateTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoRotateInterval > 0) {
      autoRotateTimeoutRef.current = setInterval(() => {
        setCurrentPage(prev => 
          prev === Math.ceil(products.length / productsPerPage) - 1 ? 0 : prev + 1
        );
      }, autoRotateInterval);
    }
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  if (isLoading) {
    return (
      <section className="py-8 px-4 md:py-12">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products?.length) {
    return (
      <section className="py-8 px-4 md:py-12">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
          </div>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">No featured products available</p>
          </div>
        </div>
      </section>
    );
  }

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = currentPage * productsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <section 
      className="py-8 px-4 md:py-12"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Navigation
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <div 
              key={product.id}
              className="transform transition-all duration-300 animate-fade-in"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        <PageIndicators
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};