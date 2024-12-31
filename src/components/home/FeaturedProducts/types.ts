import { Product } from '@/types/product.types';

export interface FeaturedProductsProps {
  products: Product[];
  isLoading: boolean;
  autoRotateInterval?: number;
}

export interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export interface PageIndicatorsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}