import { Share2, MessageCircle, Loader2 } from 'lucide-react';
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
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v10h4V14h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
            <span>Share on Facebook</span>
            {analytics.facebook > 0 && (
              <span className="ml-auto text-sm text-gray-500">
                {analytics.facebook}
              </span>
            )}
            {isSharing && <Loader2 className="w-4 h-4 animate-spin ml-2" />}
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => onShare('twitter')}
          disabled={isSharing}
          className="py-3"
        >
          <div className="flex items-center text-base w-full">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.1.9A4.5 4.5 0 0 0 22 1a9 9 0 0 1-2.8 1.1A4.5 4.5 0 0 0 16 0a4.5 4.5 0 0 0-4.5 4.5c0 .4 0 .8.1 1.2A12.8 12.8 0 0 1 1.6 2.1a4.5 4.5 0 0 0 1.4 6A4.5 4.5 0 0 1 1 8.9v.1a4.5 4.5 0 0 0 3.6 4.4A4.5 4.5 0 0 1 3 13a4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 0 19.5a12.8 12.8 0 0 0 6.9 2A12.8 12.8 0 0 0 19 6.5c0-.2 0-.4 0-.6A9 9 0 0 0 23 3z"/>
            </svg>
            <span>Share on Twitter</span>
            {analytics.twitter > 0 && (
              <span className="ml-auto text-sm text-gray-500">
                {analytics.twitter}
              </span>
            )}
            {isSharing && <Loader2 className="w-4 h-4 animate-spin ml-2" />}
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
