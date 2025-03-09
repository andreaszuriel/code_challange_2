import React from "react";
import Image from "next/image";

interface ProductCardProps {
  category: string;
  image: string;
  productName: string;
  price: string;
  specification: string;
  onBuyClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  category,
  image,
  productName,
  price,
  specification,
  onBuyClick,
}) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="card p-4 sm:p-6 border rounded-md shadow-lg w-full sm:w-72 md:w-80 lg:w-96 mx-auto mb-8 flex flex-col justify-between">
      {/* Product Image with placeholder */}
      {image && !imageError ? (
        <div className="w-full h-48 relative mb-4 rounded-md">
          <Image
            src={image}
            alt={productName}
            fill
            className="object-cover rounded-md"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-700 flex items-center justify-center mb-4 rounded-md">
          <span className="text-white">No Image Available</span>
        </div>
      )}
      
      {/* Product Name */}
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
        {productName}
      </h3>

      {/* Category */}
      <p className="text-sm text-white mb-1">
        {category}
      </p>

      {/* Price */}
      <p className="text-lg font-bold text-[var(--price-color)] mb-2">
        {price}
      </p>

      {/* Product Specification */}
      <p className="text-sm text-white mb-4 flex-grow">
        {specification}
      </p>

      {/* Buy Button */}
      <div className="flex justify-center mt-4">
        <button
          className="p-3 bg-[var(--btn-bg)] text-[var(--btn-text)] rounded-md w-full sm:w-auto md:w-64 lg:w-72 xl:w-80"
          onClick={onBuyClick}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductCard;