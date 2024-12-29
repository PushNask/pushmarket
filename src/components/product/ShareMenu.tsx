import { MessageCircle, Share2, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface ShareMenuProps {
  isSharing: boolean;
  onShare: (platform: string) => void;
  analytics: {
    whatsapp: number;
    facebook: number;
    twitter: number;
    clipboard: number;
  };
}

export const ShareMenu = ({ isSharing, onShare, analytics }: ShareMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-12 h-12">
          <Share2 className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem 
          onClick={() => onShare('whatsapp')}
          disabled={isSharing}
          className="py-3"
        >
          <div className="flex items-center text-base w-full">
            <MessageCircle className="w-5 h-5 mr-2" />
            <span>Share via WhatsApp</span>
            {analytics.whatsapp > 0 && (
              <span className="ml-auto text-sm text-gray-500">
                {analytics.whatsapp}
              </span>
            )}
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => onShare('facebook')}
          disabled={isSharing}
          className="py-3"
        >
          <div className="flex items-center text-base w-full">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2Z"/>
            </svg>
            <span>Share on Facebook</span>
            {analytics.facebook > 0 && (
              <span className="ml-auto text-sm text-gray-500">
                {analytics.facebook}
              </span>
            )}
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => onShare('twitter')}
          disabled={isSharing}
          className="py-3"
        >
          <div className="flex items-center text-base w-full">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
            </svg>
            <span>Share on X</span>
            {analytics.twitter > 0 && (
              <span className="ml-auto text-sm text-gray-500">
                {analytics.twitter}
              </span>
            )}
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => onShare('clipboard')}
          disabled={isSharing}
          className="py-3"
        >
          <div className="flex items-center text-base w-full">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1M8 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M8 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m0 0h2a2 2 0 0 1 2 2v3m2 4H10m0 0 3-3m-3 3 3 3"/>
            </svg>
            <span>Copy Link</span>
            {analytics.clipboard > 0 && (
              <span className="ml-auto text-sm text-gray-500">
                {analytics.clipboard}
              </span>
            )}
            {isSharing && <Loader2 className="w-4 h-4 animate-spin ml-2" />}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};