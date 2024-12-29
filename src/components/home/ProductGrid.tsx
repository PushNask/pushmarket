import { Product } from '@/types/product.types';
import { ProductCard } from '@/components/product/ProductCard';

interface ProductGridProps {
  products: Product[];
  totalCount: number;
}

export const ProductGrid = ({ products, totalCount }: ProductGridProps) => {
  if (!products.length) {
    return <p className="text-gray-500">No products found.</p>;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>
        <span className="text-sm text-gray-500">
          Showing {products.length} of {totalCount} products
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};