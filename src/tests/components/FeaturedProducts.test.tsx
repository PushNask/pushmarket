import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import { FeaturedProducts } from '@/components/home/FeaturedProducts/FeaturedProducts';

describe('FeaturedProducts', () => {
  const mockProducts = [
    {
      id: '1',
      title: 'Test Product 1',
      price: 100,
      images: ['/test-image-1.jpg'],
      category: 'electronics',
      location: 'Douala',
    },
    {
      id: '2',
      title: 'Test Product 2',
      price: 200,
      images: ['/test-image-2.jpg'],
      category: 'fashion',
      location: 'Yaoundé',
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