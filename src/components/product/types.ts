export interface ProductCardProps {
  id: string;
  linkNumber: number;
  title: string;
  price: number;
  currency: string;
  location: string;
  description: string;
  images: string[];
  expiresAt: Date;
  seller: {
    name: string;
    rating: number;
    responseTime: string;
    whatsappNumber: string;
    isVerified: boolean;
    shippingOptions: {
      pickup: boolean;
      shipping: boolean;
    };
  };
  metrics: {
    views: number;
    likes: number;
    linkScore: number;
  };
}

export interface ImageCarouselProps {
  images: string[];
}

export interface SellerInfoProps {
  name: string;
  rating: number;
  isVerified: boolean;
  responseTime: string;
  location: string;
}

export interface ShareButtonsProps {
  productId: string;
  title: string;
  price: number;
  currency: string;
}