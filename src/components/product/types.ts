export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  currency: string;
  location: string;
  description?: string;
  images: string[];
  category: string;
  seller?: {
    name: string;
    rating: number;
    isVerified: boolean;
    responseTime: string;
    whatsappNumber?: string;
  };
  metrics?: {
    views: number;
    likes: number;
    linkScore: number;
  };
}