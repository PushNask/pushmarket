import { PageIndicatorsProps } from './types';

export const PageIndicators = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PageIndicatorsProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            currentPage === index 
              ? 'bg-primary w-4' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Go to page ${index + 1}`}
          aria-current={currentPage === index ? 'page' : undefined}
        />
      ))}
    </div>
  );
};