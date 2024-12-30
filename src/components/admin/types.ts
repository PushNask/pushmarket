export interface PendingProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  category: string;
  images: string[];
  seller: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    location: string;
    joinedDate: string;
    totalListings: number;
    successfulSales: number;
  };
  type: 'Featured' | 'Standard';
  duration: string;
  status: 'Pending Payment' | 'Payment Verified';
  paymentAmount: number;
  paymentReference: string;
  submitted: string;
}

export interface LinkSlot {
  id: number;
  number: number;
  status: 'available' | 'occupied';
  product: string | null;
  price: number;
  stats: {
    visits24h: number;
    totalVisits: number;
    chatsInitiated24h: number;
    totalChatsInitiated: number;
    clickRate24h: string;
    avgTimeOnPage: string;
    bounceRate: string;
  };
  rank: number | null;
  activeVisitors: number;
  lastUpdated: string;
}