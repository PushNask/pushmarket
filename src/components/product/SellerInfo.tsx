import { Star, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SellerInfoProps } from './types';

export const SellerInfo = ({ name, rating, isVerified, responseTime, location }: SellerInfoProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-base text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-medium">{name}</span>
          {isVerified && (
            <Badge variant="secondary" className="text-sm px-2 py-0.5">
              Verified
            </Badge>
          )}
        </div>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400 mr-1.5" />
          <span className="text-base">{rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="text-base text-gray-600">
        📍 {location} • Response: {responseTime}
      </div>
    </div>
  );
};