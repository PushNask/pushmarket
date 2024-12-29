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
  metrics: {
    linkScore: number;
    views: number;
    likes: number;
  };
}