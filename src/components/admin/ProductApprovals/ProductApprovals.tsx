import { useState } from 'react';
import { PendingProduct } from '../types';
import { ApprovalModal } from './ApprovalModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export const ProductApprovals = () => {
  const [selectedProduct, setSelectedProduct] = useState<PendingProduct | null>(null);
  const { toast } = useToast();

  // Mock data - replace with real data from Supabase
  const pendingProducts: PendingProduct[] = [
    {
      id: '1',
      title: 'iPhone 13 Pro',
      description: 'Brand new iPhone 13 Pro, 256GB, Pacific Blue. Original packaging with 1-year warranty.',
      price: 999,
      condition: 'New',
      category: 'Electronics',
      images: ['image1.jpg', 'image2.jpg'],
      seller: {
        name: 'John Doe',
        phone: '+237 612345678',
        whatsapp: '+237 612345678',
        email: 'john@example.com',
        location: 'Douala, Cameroon',
        joinedDate: '2023-10-15',
        totalListings: 15,
        successfulSales: 12
      },
      type: 'Featured',
      duration: '48 hours',
      status: 'Pending Payment',
      paymentAmount: 25.99,
      paymentReference: 'PAY-123456',
      submitted: '2024-12-27'
    },
    {
      id: '2',
      title: 'Samsung Galaxy S24',
      description: 'Latest Samsung Galaxy S24, 512GB storage, Phantom Black. Includes all accessories.',
      price: 899,
      condition: 'New',
      category: 'Electronics',
      images: ['image3.jpg', 'image4.jpg'],
      seller: {
        name: 'Jane Smith',
        phone: '+237 687654321',
        whatsapp: '+237 687654321',
        email: 'jane@example.com',
        location: 'Yaoundé, Cameroon',
        joinedDate: '2024-01-05',
        totalListings: 8,
        successfulSales: 6
      },
      type: 'Standard',
      duration: '24 hours',
      status: 'Payment Verified',
      paymentAmount: 15.99,
      paymentReference: 'PAY-789012',
      submitted: '2024-12-28'
    }
  ];

  const handleApprove = async (id: string) => {
    try {
      // TODO: Implement approval logic with Supabase
      toast({
        title: "Product approved",
        description: "The product has been approved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve product. Please try again.",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      // TODO: Implement rejection logic with Supabase
      toast({
        title: "Product rejected",
        description: "The product has been rejected.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reject product. Please try again.",
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Product Approvals</h2>
      
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      Submitted {product.submitted}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="font-medium">{product.seller.name}</div>
                    <div className="text-gray-400">{product.seller.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={product.type === 'Featured' ? 'default' : 'secondary'}>
                      {product.type} • {product.duration}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={product.status === 'Payment Verified' ? 'default' : 'secondary'}
                    >
                      {product.status}
                    </Badge>
                    {product.paymentAmount && (
                      <div className="text-xs text-gray-500 mt-1">
                        ${product.paymentAmount}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprove(product.id);
                      }}
                    >
                      {product.status === 'Pending Payment' ? 'Verify Payment' : 'Approve'}
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:text-red-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(product.id);
                      }}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProduct && (
        <ApprovalModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};
