import { PendingProduct } from '../types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface ApprovalModalProps {
  product: PendingProduct;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const ApprovalModal = ({
  product,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: ApprovalModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Product Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Title</p>
                <p className="font-medium">{product.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-medium">${product.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Condition</p>
                <p className="font-medium">{product.condition}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-medium">{product.category}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Description</p>
              <p className="mt-1">{product.description}</p>
            </div>
          </div>

          {/* Seller Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Seller Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{product.seller.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{product.seller.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{product.seller.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">WhatsApp</p>
                <p className="font-medium">{product.seller.whatsapp}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{product.seller.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium">{product.seller.joinedDate}</p>
              </div>
            </div>
          </div>

          {/* Listing Details */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Listing Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Listing Type</p>
                <p className="font-medium">{product.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">{product.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Amount</p>
                <p className="font-medium">${product.paymentAmount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Reference</p>
                <p className="font-medium">{product.paymentReference}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="default"
            onClick={() => {
              onApprove(product.id);
              onClose();
            }}
          >
            {product.status === 'Pending Payment' ? 'Verify Payment' : 'Approve'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};