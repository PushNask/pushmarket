import { CheckCircle2, AlertCircle } from 'lucide-react';

interface DeliveryOptionsProps {
  options: {
    pickup: boolean;
    shipping: boolean;
  };
}

export const DeliveryOptions = ({ options }: DeliveryOptionsProps) => {
  return (
    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
      <span className="text-base font-medium text-gray-700">Delivery:</span>
      <div className="flex flex-wrap gap-3">
        {options.pickup && (
          <div className="flex items-center text-green-600 text-base bg-green-50 px-3 py-1.5 rounded-full">
            <CheckCircle2 className="w-5 h-5 mr-1.5" />
            <span>Pick-up</span>
          </div>
        )}
        {options.shipping ? (
          <div className="flex items-center text-green-600 text-base bg-green-50 px-3 py-1.5 rounded-full">
            <CheckCircle2 className="w-5 h-5 mr-1.5" />
            <span>Shipping</span>
          </div>
        ) : (
          <div className="flex items-center text-red-500 text-base bg-red-50 px-3 py-1.5 rounded-full">
            <AlertCircle className="w-5 h-5 mr-1.5" />
            <span>No Shipping</span>
          </div>
        )}
      </div>
    </div>
  );
};