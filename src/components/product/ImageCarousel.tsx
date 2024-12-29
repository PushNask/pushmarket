import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export const ImageCarousel = ({ images, currentIndex, onIndexChange }: ImageCarouselProps) => {
  return (
    <div className="relative w-full aspect-square bg-gray-100">
      <img
        src={images[currentIndex]}
        alt={`Product ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />

      <button
        onClick={() => onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
        className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-start px-2 bg-gradient-to-r from-black/20 to-transparent"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>
      
      <button
        onClick={() => onIndexChange((currentIndex + 1) % images.length)}
        className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-end px-2 bg-gradient-to-l from-black/20 to-transparent"
        aria-label="Next image"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      <div className="absolute top-3 right-3 bg-black/50 text-white px-3 py-1.5 rounded-full text-base">
        {currentIndex + 1}/{images.length}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentIndex === index ? 'bg-white w-5' : 'bg-white/50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};