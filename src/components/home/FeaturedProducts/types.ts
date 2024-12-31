export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  location: string;
  [key: string]: any;
}

export interface FeaturedProductsProps {
  products: Product[];
  isLoading?: boolean;
  autoRotateInterval?: number;
}

export interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  isLoading?: boolean;
}

export interface PageIndicatorsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}