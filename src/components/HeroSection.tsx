import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import useDiscount from "../hooks/useDiscount";
// import { useAppSelector } from "../redux/hooks";

const HeroSection: FC = () => {
  const products = useAppSelector(
    (state) => state.productReducer.featuredProducts
  );
 const random = Math.floor(Math.random() * 6);
  return (
    <div className="bg-[#e3edf6] font-lora">
      <div className="container px-4 grid md:grid-cols-2 py-8 mx-auto">
        <div className="flex items-center">
          <div className="max-w-[450px] space-y-4">
            <p className="text-black">
              Starting At{" "}
              <span className="font-bold">
                Tk.
                {useDiscount({
                  price: products[random]?.price,
                  discount: products[random]?.discountPercentage,
                })}
              </span>
            </p>
            <h2 className="text-black font-bold text-4xl md:text-5xl">
              {products[random]?.title}
            </h2>
            <h3 className="text-2xl">
              Exclusive offer{" "}
              <span className="text-red-600">
                -{products[random]?.discountPercentage}%
              </span>{" "}
              off this week
            </h3>
            <Link
              to={`/product/${products[random]?._id}`}
              data-test="hero-btn"
              className="inline-block bg-white rounded-md px-6 py-3 hover:bg-indigo-500 hover:text-white"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div>
          <img
            src={products[random]?.images?.at(0) || "/hero.png"}
            alt="hero"
            className="ml-auto mt-5 lg:mt-0 w-full h-full max-w-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
