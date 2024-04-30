import { FC } from "react";
import useDiscount from "../hooks/useDiscount";

const PriceSection: FC<{
  price: number;
  discountPercentage: number;
  sales?: number;
}> = ({ price, discountPercentage = 0 }) => {
  const result = useDiscount({ price, discount: discountPercentage });
  const discount = parseFloat(discountPercentage.toString());
  if (Math.floor(discount) === 0) {
    return <h2 className="font-semibold text-indigo-500 text-2xl">৳{price}</h2>;
  }
  return (
    <div className="leading-3">
      <div className="flex items-center gap-1 flex-wrap">
        <h2 className="font-semibold text-indigo-500 text-xl">
          ৳ {result.toFixed(2)}
        </h2>
        <span className="mr-1 text-md line-through text-gray-400 -mb-2">৳ {price}</span>
      </div>
    </div>
  );
};

export default PriceSection;
