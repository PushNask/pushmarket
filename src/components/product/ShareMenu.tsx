import { useState } from 'react';
import { Share2, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ShareMenuProps {
  productId: string;
  title: string;
  price: number;
  currency: string;
}

export const ShareMenu = ({ productId, title, price, currency }: ShareMenuProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareAnalytics, setShareAnalytics] = useState({
    whatsapp: 0,
    facebook: 0,
    twitter: 0,
    clipboard: 0
  });

  const handleShare = async (platform: keyof typeof shareAnalytics) => {
    setIsSharing(true);
    const productUrl = `${window.location.origin}/product/${productId}`;
    const formattedPrice = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(price);
    const shareText = `Check out this product: ${title} (${formattedPrice})`;
    
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
        {/* Share menu items */}
        {Object.keys(shareAnalytics).map((platform) => (
          <DropdownMenuItem 
            key={platform}
            onClick={() => handleShare(platform as keyof typeof shareAnalytics)}
            disabled={isSharing}
            className="py-3"
          >
            <div className="flex items-center text-base w-full">
              {platform === 'whatsapp' && <MessageCircle className="w-5 h-5 mr-2" />}
              {/* Add other platform icons here */}
              <span>Share via {platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
              {shareAnalytics[platform as keyof typeof shareAnalytics] > 0 && (
                <span className="ml-auto text-sm text-gray-500">
                  {shareAnalytics[platform as keyof typeof shareAnalytics]}
                </span>
              )}
              {isSharing && platform === 'clipboard' && <Loader2 className="w-4 h-4 animate-spin ml-2" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};