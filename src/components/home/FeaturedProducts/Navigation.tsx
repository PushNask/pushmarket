import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        disabled={currentPage === 0 || isLoading}
        className="h-8 w-8"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={currentPage === totalPages - 1 || isLoading}
        className="h-8 w-8"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};