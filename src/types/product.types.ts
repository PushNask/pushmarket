export interface Product {
  id: string;
  linkNumber: number;
  category: string;
  location: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  approvedAt: Date;
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
    linkScore: number;
    views: number;
    likes: number;
  };
}