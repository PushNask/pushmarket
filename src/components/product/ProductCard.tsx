import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Eye, Star, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ImageCarousel } from './ImageCarousel';
import { ShareMenu } from './ShareMenu';
import type { ProductCardProps } from './types';

export const ProductCard = ({
  id,
  linkNumber,
  title,
  price,
  currency,
  location,
  description,
  images,
  expiresAt,
  seller,
  metrics
}: ProductCardProps) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [timerColor, setTimerColor] = useState('text-green-500');

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleWhatsAppClick = () => {
    const message = `Hi, I'm interested in your product: ${title} (${formatPrice(price)})`;
    const whatsappUrl = `https://wa.me/${seller.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
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
            <span className={`text-base font-medium ${timerColor}`}>
              {timeRemaining}
            </span>
          </div>
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

        <p className="text-base text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between text-base text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">{seller.name}</span>
            {seller.isVerified && (
              <Badge variant="secondary" className="text-sm px-2 py-0.5">
                Verified
              </Badge>
            )}
          </div>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 mr-1.5" />
            <span className="text-base">{seller.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="text-base text-gray-600 mb-3">
          📍 {location} • Response: {seller.responseTime}
        </div>

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
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-3">
        <Button 
          onClick={handleWhatsAppClick}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12 text-base"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          WhatsApp
        </Button>
        <Button variant="outline" size="icon" className="w-12 h-12">
          <Heart className="w-5 h-5" />
        </Button>
        <ShareMenu
          productId={id}
          title={title}
          price={price}
          currency={currency}
        />
      </CardFooter>
    </Card>
  );
};