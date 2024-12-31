export interface ProductCardProps {
  id: string;
  linkNumber?: number;
  title: string;
  price: number;
  currency: string;
  location: string;
  description?: string;
  images: string[];
  category: string;
  expiresAt?: Date;
  seller?: {
    name: string;
    rating: number;
    isVerified: boolean;
    responseTime: string;
    whatsappNumber?: string;
    shippingOptions?: {
      pickup: boolean;
      shipping: boolean;
    };
  };
  metrics?: {
    views: number;
    likes: number;
    linkScore: number;
  };
}

export interface ImageCarouselProps {
  images: string[];
  onImageLoad?: () => void;
  onImageError?: () => void;
}

export interface SellerInfoProps {
  name: string;
  rating?: number;
  isVerified?: boolean;
  responseTime?: string;
  location: string;
}

export interface ShareButtonsProps {
  productId: string;
  title: string;
  price: number;
  currency: string;
}