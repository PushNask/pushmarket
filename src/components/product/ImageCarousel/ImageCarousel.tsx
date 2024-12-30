import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface ImageCarouselProps {
  images: string[];
  onImageLoad?: () => void;
  onImageError?: () => void;
}

export const ImageCarousel = ({ images, onImageLoad, onImageError }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handlePrevious = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    touchEventOptions: { passive: false },
    trackMouse: true
  });

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onImageLoad?.();
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    onImageError?.();
  };

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [currentIndex]);

  return (
    <div 
      className="relative w-full aspect-square bg-gray-100 overflow-hidden"
      {...handlers}
    >
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Product image ${currentIndex + 1}`}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-500">Failed to load image</span>
        </div>
      )}

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-start px-2 bg-gradient-to-r from-black/20 to-transparent touch-manipulation"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-end px-2 bg-gradient-to-l from-black/20 to-transparent touch-manipulation"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-3 right-3 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm">
            {currentIndex + 1}/{images.length}
          </div>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentIndex === index ? 'bg-white w-5' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};