import { FC } from "react";
import { Product } from "../models/Product";
// import RatingStar from "./RatingStar";
import { addToCart } from "../redux/features/cartSlice";
import { useAppDispatch } from "../redux/hooks";
import toast from "react-hot-toast";
import { AiFillStar, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import PriceSection from "./PriceSection";
// import useAuth from "../hooks/useAuth";
import useDiscount from "../hooks/useDiscount";

const ProductCard: FC<Product> = ({
  _id,
  price,
  thumbnail,
  title,
  category,
  rating,
  discountPercentage = 0,
}) => {
  const dispatch = useAppDispatch();
  // const { requireAuth } = useAuth();
  const result = useDiscount({ price, discount: discountPercentage });

  const addCart = () => {
    dispatch(
      addToCart({
        _id,
        price,
        title,
        category,
        rating,
        thumbnail,
        discountPercentage,
      })
    );
    toast.success("item added to cart successfully", {
      duration: 3000,
    });
  };

  return (
    <div className="border border-gray-200 font-lato" data-test="product-card">
      <div className="text-center border-b border-gray-200">
        <Link to={{ pathname: `/product/${_id}` }}>
          <img src={thumbnail} alt={title} className="inline-block h-60" />
        </Link>
      </div>
      <div className="px-8 pt-4">
        <p className="text-gray-500 text-[14px] font-medium">{category}</p>
        <Link
          className="font-semibold hover:underline"
          to={{ pathname: `/product/${_id}` }}
        >
          {title}
        </Link>
      </div>
      <div className="px-8 flex items-center gap-1 text-gray-400">
        {/* <RatingStar rating={rating} /> */}
        <AiFillStar className="text-[#ffb21d] opacity-80" />
        {rating}/5
        <span className="ml-2">6k Sold</span>
      </div>
      <div className="px-8 flex items-center gap-1 py-1">
        <span className="border border-teal-600 px-1 rounded text-teal-600 text-xs">Free Delivery</span>
        <span className="border border-orange-600 px-1 rounded text-orange-600 text-xs">Tk. {(price - result).toFixed(2)} Off</span>
      </div>
      <div className="flex mt-1 justify-between px-8 pb-4">
        { (
          <PriceSection discountPercentage={discountPercentage} price={price} />
        )}
        <button
          type="button"
          className="flex w-2/3 items-center justify-center space-x-2 hover:bg-indigo-500 text-white py-2 lg:px-4 px-1 rounded bg-indigo-500"
          onClick={addCart}
          data-test="add-cart-btn"
        >
          <AiOutlineShoppingCart />
          <span>ADD TO CART</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
