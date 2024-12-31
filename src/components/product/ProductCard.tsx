import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle,
  Heart,
  Share2,
  Eye,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  Link2 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductCardProps } from './types';

export const ProductCard = ({ 
  id,
  linkNumber,
  title,
  price,
  currency,
  location,
  description,
  images,
  category,
  expiresAt,
  seller,
  metrics
}: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [shareAnalytics, setShareAnalytics] = useState({
    whatsapp: 0,
    facebook: 0,
    twitter: 0,
    clipboard: 0
  });

  const handleShare = async (platform: string) => {
    setIsSharing(true);
    const productUrl = `${window.location.origin}/product/${id}`;
    const shareText = `Check out this product: ${title} (${formatPrice(price)})`;
    
    try {
      switch (platform) {
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + productUrl)}`, '_blank');
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`, '_blank');
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`, '_blank');
          break;
        case 'clipboard':
          await navigator.clipboard.writeText(productUrl);
          alert('Link copied to clipboard!');
          break;
      }
      
      setShareAnalytics(prev => ({
        ...prev,
        [platform]: prev[platform] + 1
      }));
    } catch (error) {
      console.error('Share error:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleWhatsApp = () => {
    if (!seller?.whatsappNumber) return;
    const message = `Hi, I'm interested in your product: ${title} (${formatPrice(price)})`;
    const whatsappUrl = `https://wa.me/${seller.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency || 'XAF',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {linkNumber && (
              <Badge variant="default" className="text-xs">
                P{linkNumber}
              </Badge>
            )}
            {expiresAt && (
              <span className="text-sm font-medium text-green-500">
                {/* Add expiry time calculation here if needed */}
                25h 0m
              </span>
            )}
          </div>
          {metrics && (
            <div className="flex items-center text-sm text-gray-600">
              <Eye className="w-4 h-4 mr-1" />
              {metrics.views}
            </div>
          )}
        </div>
      </div>

      <div className="relative w-full aspect-square bg-gray-100 group">
        <img
          src={images[currentImageIndex]}
          alt={title}
          className="w-full h-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
              {currentImageIndex + 1}/{images.length}
            </div>

            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === index ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          <span className="font-bold text-lg text-green-600 whitespace-nowrap">
            {formatPrice(price)}
          </span>
        </div>

        {description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {seller && (
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <span className="font-medium">{seller.name}</span>
              {seller.isVerified && (
                <Badge variant="secondary" className="ml-1">Verified</Badge>
              )}
            </div>
            {seller.rating && (
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{seller.rating}</span>
              </div>
            )}
          </div>
        )}

        <div className="text-sm text-gray-600 mb-2">
          📍 {location} {seller?.responseTime && `• Response: ${seller.responseTime}`}
        </div>

        {seller?.shippingOptions && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-700">Delivery:</span>
            <div className="flex gap-3">
              {seller.shippingOptions.pickup && (
                <div className="flex items-center text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>Pick-up</span>
                </div>
              )}
              {!seller.shippingOptions.shipping && (
                <div className="flex items-center text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span>No Shipping</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 pt-0 flex gap-2">
        <Button 
          onClick={handleWhatsApp}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          disabled={!seller?.whatsappNumber}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </Button>
        <Button variant="outline" size="icon">
          <Heart className="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem 
              onClick={() => handleShare('whatsapp')}
              disabled={isSharing}
              className="py-3"
            >
              <div className="flex items-center text-base w-full">
                <MessageCircle className="w-5 h-5 mr-2" />
                <span>Share via WhatsApp</span>
                {shareAnalytics.whatsapp > 0 && (
                  <span className="ml-auto text-sm text-gray-500">
                    {shareAnalytics.whatsapp}
                  </span>
                )}
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => handleShare('facebook')}
              disabled={isSharing}
              className="py-3"
            >
              <div className="flex items-center text-base w-full">
                <Share2 className="w-5 h-5 mr-2" />
                <span>Share on Facebook</span>
                {shareAnalytics.facebook > 0 && (
                  <span className="ml-auto text-sm text-gray-500">
                    {shareAnalytics.facebook}
                  </span>
                )}
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem 
              onClick={() => handleShare('twitter')}
              disabled={isSharing}
              className="py-3"
            >
              <div className="flex items-center text-base w-full">
                <Share2 className="w-5 h-5 mr-2" />
                <span>Share on X</span>
                {shareAnalytics.twitter > 0 && (
                  <span className="ml-auto text-sm text-gray-500">
                    {shareAnalytics.twitter}
                  </span>
                )}
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem 
              onClick={() => handleShare('clipboard')}
              disabled={isSharing}
              className="py-3"
            >
              <div className="flex items-center text-base w-full">
                <Link2 className="w-5 h-5 mr-2" />
                <span>Copy Link</span>
                {shareAnalytics.clipboard > 0 && (
                  <span className="ml-auto text-sm text-gray-500">
                    {shareAnalytics.clipboard}
                  </span>
                )}
                {isSharing && <Loader2 className="w-4 h-4 animate-spin ml-2" />}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};