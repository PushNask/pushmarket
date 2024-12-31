import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigationProps } from './types';

export const Navigation = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  isLoading
}: NavigationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevious}
        disabled={isLoading}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={isLoading}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};