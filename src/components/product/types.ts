export interface ProductCardProps {
  id: string;
  linkNumber: number;
  title: string;
  price: number;
  currency: string;
  location: string;
  description: string;
  images: string[];  // Changed from single image to array
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