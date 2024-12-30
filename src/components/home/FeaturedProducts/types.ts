export interface FeaturedProductsProps {
  products: Array<{
    id: string;
    title: string;
    price: number;
    images: string[];
    [key: string]: any;
  }>;
  isLoading?: boolean;
  autoRotateInterval?: number;
}