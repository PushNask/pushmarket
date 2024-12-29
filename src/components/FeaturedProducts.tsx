import { ProductCard } from './ProductCard';

const FEATURED_PRODUCTS = [
  {
    title: "Premium Product 1",
    price: 299,
    image: "public/placeholder.svg"
  },
  {
    title: "Premium Product 2",
    price: 199,
    image: "public/placeholder.svg"
  },
  {
    title: "Premium Product 3",
    price: 399,
    image: "public/placeholder.svg"
  }
];

export const FeaturedProducts = () => {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PRODUCTS.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};