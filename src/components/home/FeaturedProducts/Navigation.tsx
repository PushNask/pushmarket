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
        className="h-10 w-10 rounded-full hover:scale-110 transition-transform duration-200"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={currentPage === totalPages - 1 || isLoading}
        className="h-10 w-10 rounded-full hover:scale-110 transition-transform duration-200"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};