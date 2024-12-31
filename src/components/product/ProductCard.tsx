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
import { ImageCarousel } from './ImageCarousel';
import { SellerInfo } from './SellerInfo';
import { ShareButtons } from './ShareButtons';
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
    if (!seller?.whatsappNumber) return;
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

        {description && (
          <p className="text-base text-gray-600 mb-4 leading-relaxed">
            {description}
          </p>
        )}

        {seller && (
          <SellerInfo
            name={seller.name}
            rating={seller.rating}
            isVerified={seller.isVerified}
            responseTime={seller.responseTime}
            location={location}
          />
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
        <ShareButtons
          productId={id}
          title={title}
          price={price}
          currency={currency}
        />
      </CardFooter>
    </Card>
  );
};