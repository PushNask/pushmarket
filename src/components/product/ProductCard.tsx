import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Eye } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ImageCarousel } from './ImageCarousel/ImageCarousel';
import { SellerInfo } from './SellerInfo/SellerInfo';
import { DeliveryOptions } from './DeliveryOptions/DeliveryOptions';
import { ShareMenu } from './ShareMenu/ShareMenu';
import { ProductCardProps } from './types';

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
  const [timeRemaining, setTimeRemaining] = useState('');
  const [timerColor, setTimerColor] = useState('text-green-500');
  const [isSharing, setIsSharing] = useState(false);
  const [shareAnalytics, setShareAnalytics] = useState({
    whatsapp: 0,
    facebook: 0,
    twitter: 0,
    clipboard: 0
  });

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

  return (
    <Card className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="p-3 sm:p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="default" className="text-sm py-1 px-2">
              P{linkNumber}
            </Badge>
            {expiresAt && (
              <span className={`text-base font-medium ${timerColor}`}>
                {timeRemaining}
              </span>
            )}
          </div>
          {metrics && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center text-base text-gray-600 px-2">
                    <Eye className="w-5 h-5 mr-1.5" />
                    {metrics.views}
                  </div>
                </TooltipTrigger>
                <TooltipContent>Total Views</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>

      <ImageCarousel images={images} />

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

        {seller && (
          <>
            <SellerInfo
              name={seller.name}
              rating={seller.rating}
              isVerified={seller.isVerified}
              responseTime={seller.responseTime}
              location={location}
            />
            
            {seller.shippingOptions && (
              <DeliveryOptions options={seller.shippingOptions} />
            )}
          </>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-3">
        <Button 
          onClick={handleWhatsAppClick}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12 text-base"
          disabled={!seller?.whatsappNumber}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          WhatsApp
        </Button>
        <Button variant="outline" size="icon" className="w-12 h-12">
          <Heart className="w-5 h-5" />
        </Button>
        <ShareMenu
          isSharing={isSharing}
          onShare={handleShare}
          analytics={shareAnalytics}
        />
      </CardFooter>
    </Card>
  );
};