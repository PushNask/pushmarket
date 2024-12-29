import { Package, Clock, Tag } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white w-full py-10 mb-4">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome to PushNshop Marketplace</h1>
        <p className="text-lg sm:text-xl opacity-90">
          The trusted marketplace for buyers and sellers in Cameroon
        </p>
        <div className="flex items-center justify-center gap-4 text-sm sm:text-base mt-4">
          <span className="flex items-center">
            <Package className="w-4 h-4 mr-1" />
            120 Premium Slots
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Real-time Updates
          </span>
          <span className="flex items-center">
            <Tag className="w-4 h-4 mr-1" />
            Best Deals
          </span>
        </div>
      </div>
    </section>
  );
};