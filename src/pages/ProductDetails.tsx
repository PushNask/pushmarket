import { useParams } from 'react-router-dom';
import { ProductCard } from '@/components/product/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  
  // TODO: Fetch product details using id
  const product = {
    id: id,
    linkNumber: 5,
    title: "iPhone 13 Pro - 256GB - Perfect Condition",
    price: 450000,
    currency: "XAF",
    location: "Douala, Cameroon",
    description: "Barely used iPhone 13 Pro with all accessories. No scratches, perfect battery health.",
    images: Array(5).fill("/api/placeholder/400/400"),
    expiresAt: new Date(Date.now() + 25 * 60 * 60 * 1000),
    seller: {
      name: "Tech Store CM",
      rating: 4.8,
      responseTime: "~5 mins",
      whatsappNumber: "237612345678",
      isVerified: true,
      shippingOptions: {
        pickup: true,
        shipping: false
      }
    },
    metrics: {
      views: 156,
      likes: 23,
      linkScore: 85
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProductCard {...product} />
    </div>
  );
};

export default ProductDetails;