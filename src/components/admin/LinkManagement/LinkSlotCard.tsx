import { LinkSlot } from '../types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface LinkSlotCardProps {
  slot: LinkSlot;
}

export const LinkSlotCard = ({ slot }: LinkSlotCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-lg font-medium">Slot {slot.number}</h3>
        <Badge variant={slot.status === 'available' ? 'secondary' : 'default'}>
          {slot.status === 'available' ? 'Available' : 'Occupied'}
        </Badge>
      </CardHeader>
      <CardContent>
        {slot.status === 'occupied' && (
          <>
            <div className="mb-3">
              <p className="text-sm text-gray-600">{slot.product}</p>
              <p className="text-sm text-gray-500">Price: ${slot.price}</p>
            </div>
            
            <div className="space-y-2">
              <div className="bg-blue-50 p-2 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-700">
                    Active Visitors
                  </span>
                  <span className="text-sm font-bold text-blue-700">
                    {slot.activeVisitors}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-2 rounded-lg space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Visits (24h)</span>
                  <span className="text-xs font-medium">{slot.stats.visits24h}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Click Rate (24h)</span>
                  <span className="text-xs font-medium">{slot.stats.clickRate24h}</span>
                </div>
              </div>

              {slot.rank && (
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-blue-600 font-medium">Rank #{slot.rank}</span>
                  <span className="text-xs text-gray-500">
                    Updated {new Date(slot.lastUpdated).toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};