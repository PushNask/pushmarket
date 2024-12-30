import { LinkSlotCard } from './LinkSlotCard';
import { LinkSlot } from '../types';

export const LinkManagement = () => {
  // Mock data - replace with real data from Supabase
  const featuredSlots: LinkSlot[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    number: i + 1,
    status: i % 3 === 0 ? 'available' : 'occupied',
    product: i % 3 === 0 ? null : `Product ${i + 1}`,
    price: Math.floor(Math.random() * 500) + 500,
    stats: {
      visits24h: Math.floor(Math.random() * 1000),
      totalVisits: Math.floor(Math.random() * 10000),
      chatsInitiated24h: Math.floor(Math.random() * 100),
      totalChatsInitiated: Math.floor(Math.random() * 1000),
      clickRate24h: (Math.random() * 15 + 5).toFixed(1) + '%',
      avgTimeOnPage: Math.floor(Math.random() * 180 + 60) + 's',
      bounceRate: (Math.random() * 30 + 20).toFixed(1) + '%'
    },
    rank: i % 3 === 0 ? null : Math.floor(Math.random() * 10) + 1,
    activeVisitors: Math.floor(Math.random() * 20),
    lastUpdated: new Date(Date.now() - Math.random() * 3600000).toISOString()
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Link Management</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Featured Slots (1-12)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredSlots.map((slot) => (
            <LinkSlotCard key={slot.id} slot={slot} />
          ))}
        </div>
      </div>
    </div>
  );
};