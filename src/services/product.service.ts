import { Product } from '@/types/product.types';

export async function fetchPermanentLinks(): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate mock products
  return Array.from({ length: 120 }, (_, i) => ({
    id: `${i + 1}`,
    linkNumber: i + 1,
    category: Math.random() > 0.5 ? 'electronics' : 'fashion',
    location: Math.random() > 0.5 ? 'Douala' : 'Yaoundé',
    title: `Product ${i + 1}`,
    description: 'Some product description...',
    price: Math.floor(Math.random() * 1000000) + 100000,
    currency: 'XAF',
    images: Array(5).fill('/api/placeholder/400/400'),
    approvedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    metrics: {
      linkScore: Math.floor(Math.random() * 100),
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 100),
    },
  }));
}