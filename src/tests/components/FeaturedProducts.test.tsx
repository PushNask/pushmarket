import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import { FeaturedProducts } from '@/components/home/FeaturedProducts/FeaturedProducts';

describe('FeaturedProducts', () => {
  const mockProducts = [
    {
      id: '1',
      linkNumber: 1,
      title: 'Test Product 1',
      price: 100,
      images: ['/test-image-1.jpg'],
      category: 'electronics',
      location: 'Douala',
      currency: 'XAF',
      description: 'Test description',
      approvedAt: new Date(),
      expiresAt: new Date(),
      seller: {
        name: 'Test Seller',
        rating: 4.5,
        responseTime: '~5 mins',
        whatsappNumber: '123456789',
        isVerified: true,
        shippingOptions: {
          pickup: true,
          shipping: false
        }
      },
      metrics: {
        views: 100,
        likes: 10,
        linkScore: 85
      }
    },
    {
      id: '2',
      linkNumber: 2,
      title: 'Test Product 2',
      price: 200,
      images: ['/test-image-2.jpg'],
      category: 'fashion',
      location: 'Yaoundé',
      currency: 'XAF',
      description: 'Test description 2',
      approvedAt: new Date(),
      expiresAt: new Date(),
      seller: {
        name: 'Test Seller 2',
        rating: 4.0,
        responseTime: '~10 mins',
        whatsappNumber: '987654321',
        isVerified: false,
        shippingOptions: {
          pickup: true,
          shipping: true
        }
      },
      metrics: {
        views: 50,
        likes: 5,
        linkScore: 75
      }
    },
  ];

  it('renders loading state correctly', () => {
    renderWithProviders(<FeaturedProducts products={[]} isLoading={true} />);
    expect(screen.getByText(/Featured Products/i)).toBeInTheDocument();
  });

  it('renders products correctly', () => {
    renderWithProviders(<FeaturedProducts products={mockProducts} isLoading={false} />);
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('handles empty products state', () => {
    renderWithProviders(<FeaturedProducts products={[]} isLoading={false} />);
    expect(screen.getByText(/No featured products available/i)).toBeInTheDocument();
  });
});