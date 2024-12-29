import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Eye, Star, CheckCircle2, AlertCircle, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ProductCardProps } from './types';

export const ProductCard = ({
  id,
  linkNumber,
  title,
  price,
  currency = 'XAF',
  location,
  description,
  images = [],
  expiresAt,
  seller,
  metrics
}: ProductCardProps) => {
  // State management
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [timerColor, setTimerColor] = useState('text-green-500');
  const [isSharing, setIsSharing] = useState(false);
  const [shareAnalytics, setShareAnalytics] = useState({
    whatsapp: 0,
    facebook: 0,
    twitter: 0,
    clipboard: 0
  });

  // Helper functions
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleWhatsAppClick = () => {
    if (!seller?.whatsappNumber) return;
    const message = `Hi, I'm interested in your product: ${title} (${formatPrice(price)})`;
    const whatsappUrl = `https://wa.me/${seller.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
      alert('Failed to share. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  // Timer effect
  useEffect(() => {
    if (!expiresAt) return;

    const updateTimer = () => {
      const now = new Date();
      const diff = expiresAt.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours < 0) {
        setTimeRemaining('Expired');
        setTimerColor('text-gray-500');
      } else {
        setTimeRemaining(`${hours}h ${minutes}m`);
        if (hours < 12) {
          setTimerColor('text-red-500');
        } else if (hours < 24) {
          setTimerColor('text-orange-500');
        } else {
          setTimerColor('text-green-500');
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  if (!seller) return null;

  return (
    <Card className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="p-3 sm:p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="default" className="text-sm py-1 px-2">
              P{linkNumber}
            </Badge>
            <span className={`text-base font-medium ${timerColor}`}>
              {timeRemaining}
            </span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center text-base text-gray-600 px-2">
                  <Eye className="w-5 h-5 mr-1.5" />
                  {metrics?.views ?? 0}
                </div>
              </TooltipTrigger>
              <TooltipContent>Total Views</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <div className="relative w-full aspect-square bg-gray-100">
        <img
          src={images[currentImageIndex] ?? '/placeholder.jpg'}
          alt={`${title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1)}
              className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-start px-2 bg-gradient-to-r from-black/20 to-transparent"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-end px-2 bg-gradient-to-l from-black/20 to-transparent"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            <div className="absolute top-3 right-3 bg-black/50 text-white px-3 py-1.5 rounded-full text-base">
              {currentImageIndex + 1}/{images.length}
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentImageIndex === index ? 'bg-white w-5' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="font-semibold text-xl leading-tight line-clamp-2">
            {title}
          </h3>
          <span className="font-bold text-xl text-green-600 whitespace-nowrap">
            {formatPrice(price)}
          </span>
        </div>

        {description && (
          <p className="text-base text-gray-600 mb-4 leading-relaxed">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between text-base text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">{seller.name}</span>
            {seller.isVerified && (
              <Badge variant="secondary" className="text-sm px-2 py-0.5">
                Verified
              </Badge>
            )}
          </div>
          {seller.rating && (
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1.5" />
              <span className="text-base">{seller.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="text-base text-gray-600 mb-3">
          📍 {location} {seller.responseTime && `• Response: ${seller.responseTime}`}
        </div>

        {seller.shippingOptions && (
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
            <span className="text-base font-medium text-gray-700">Delivery:</span>
            <div className="flex flex-wrap gap-3">
              {seller.shippingOptions.pickup && (
                <div className="flex items-center text-green-600 text-base bg-green-50 px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-5 h-5 mr-1.5" />
                  <span>Pick-up</span>
                </div>
              )}
              {seller.shippingOptions.shipping ? (
                <div className="flex items-center text-green-600 text-base bg-green-50 px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-5 h-5 mr-1.5" />
                  <span>Shipping</span>
                </div>
              ) : (
                <div className="flex items-center text-red-500 text-base bg-red-50 px-3 py-1.5 rounded-full">
                  <AlertCircle className="w-5 h-5 mr-1.5" />
                  <span>No Shipping</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-3">
        <Button 
          onClick={handleWhatsAppClick}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12 text-base"
          disabled={!seller.whatsappNumber}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          WhatsApp
        </Button>
        <Button variant="outline" size="icon" className="w-12 h-12">
          <Heart className="w-5 h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="w-12 h-12">
              <Share2 className="w-5 h-5" />
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
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2Z"/>
                </svg>
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
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
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
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1M8 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M8 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m0 0h2a2 2 0 0 1 2 2v3m2 4H10m0 0 3-3m-3 3 3 3"/>
                </svg>
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
      </CardFooter>
    </Card>
  );
};