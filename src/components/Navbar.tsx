import { FC } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setCartState } from "../redux/features/cartSlice";
import { updateModal } from "../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { FaRegUserCircle } from "react-icons/fa";
import CustomPopup from "./CustomPopup";
import { addProducts } from "../redux/features/productSlice";
import { FaShopify } from "react-icons/fa6";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartCount = useAppSelector(
    (state) => state.cartReducer.cartItems.length
  );
  const allProducts = useAppSelector(
    (state) => state.productReducer.allProducts
  );
  const username = useAppSelector((state) => state.authReducer.username);
  // const { requireAuth } = useAuth();

  const showCart = () => {
    // requireAuth(() => dispatch(setCartState(true)));
    dispatch(setCartState(true));
  };

  const searchResults = (text: string) => {
    navigate("/products/");
    localStorage.setItem("category", "all");
    if (text === "") {
      fetch("https://dhserver.vercel.app/products?limit=100")
        .then((res) => res.json())
        .then((products) => {
          dispatch(addProducts(products));
        });
    }
    const results = allProducts?.filter((product) => {
      return product.title.toLowerCase().includes(text.trim().toLowerCase());
    });
    dispatch(addProducts(results));
  };

  return (
    <div className="py-4 bg-white top-0 sticky z-10 shadow-lg font-karla">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="lg:text-4xl text-lg font-bold font-brolink"
            data-test="main-logo"
          >
            Decor
          </Link>
          <div className="lg:flex hidden w-full max-w-[500px]">
            <input
              id="searchBox"
              onChange={(e) => searchResults(e.target.value)}
              type="text"
              placeholder="Search for a product..."
              className="border-2 border-zinc-800 rounded-l-xl px-6 py-2 w-full outline-none"
            />
            <div className="bg-zinc-800 text-white text-[26px] rounded-r-xl grid place-items-center px-4">
              <BsSearch />
            </div>
          </div>
          <Link
            to="/products"
            className="text-xl font-semibold flex items-center"
            data-test="main-products"
          >
            <FaShopify />
            Products
          </Link>
          <div className="flex gap-4 md:gap-8 items-center">
            <div className="lg:block hidden">
              <div className="flex items-center gap-2">
                {username !== "" && (
                  <img
                    src="https://robohash.org/Terry.png?set=set4"
                    alt="avatar"
                    className="w-6"
                  />
                )}
                <button className="bg-zinc-800 text-white rounded px-3 py-1">
                  {username !== "" ? (
                    <CustomPopup />
                  ) : (
                    <span
                      className="cursor-pointer"
                      onClick={() => dispatch(updateModal(true))}
                      data-test="login-btn"
                    >
                      Login
                    </span>
                  )}
                </button>
              </div>
            </div>
            <div
              className="text-gray-500 text-[32px] relative hover:cursor-pointer hover:opacity-80"
              onClick={showCart}
              data-test="cart-btn"
            >
              <AiOutlineShoppingCart />
              <div
                className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-sm grid items-center justify-center "
                data-test="cart-item-count"
              >
                {cartCount}
              </div>
            </div>
            <div>
              <FaRegUserCircle
                onClick={() => dispatch(updateModal(true))}
                className="text-zinc-800 text-2xl lg:hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
