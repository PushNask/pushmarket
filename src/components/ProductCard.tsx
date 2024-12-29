interface ProductCardProps {
  title: string;
  price: number;
  image: string;
}

export const ProductCard = ({ title, price, image }: ProductCardProps) => {
  return (
    <div className="group hover-scale">
      <div className="relative aspect-square overflow-hidden rounded-lg glass">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-medium text-lg truncate">{title}</h3>
        <p className="text-primary font-semibold">
          ${price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};