import { useState } from 'react';
import { Share2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShareButtonsProps } from './types';

export const ShareButtons = ({ productId, title, price, currency }: ShareButtonsProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareAnalytics, setShareAnalytics] = useState({
    whatsapp: 0,
    facebook: 0,
    twitter: 0,
    clipboard: 0
  });

  const handleShare = async (platform: string) => {
    setIsSharing(true);
    const productUrl = `${window.location.origin}/product/${productId}`;
    const shareText = `Check out this product: ${title} (${price} ${currency})`;
    
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

  return (
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
            <span>Share via Facebook</span>
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
            <span>Share via Twitter</span>
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
            <span>Copy Link</span>
            {shareAnalytics.clipboard > 0 && (
              <span className="ml-auto text-sm text-gray-500">
                {shareAnalytics.clipboard}
              </span>
            )}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
