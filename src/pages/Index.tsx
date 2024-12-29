import { SearchBar } from "@/components/SearchBar";
import { FeaturedProducts } from "@/components/FeaturedProducts";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white" />
        <div className="relative container px-4 mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
            Welcome to PushNshop
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in [animation-delay:200ms]">
            Discover Amazing Products
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:400ms]">
            Find the best deals on premium items from trusted sellers
          </p>
          <div className="animate-fade-in [animation-delay:600ms]">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />
    </div>
  );
};

export default Index;