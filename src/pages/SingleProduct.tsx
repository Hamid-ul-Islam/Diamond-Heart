import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { addToCart, setCartState } from "../redux/features/cartSlice";
import { Product } from "../models/Product";
import RatingStar from "../components/RatingStar";
import PriceSection from "../components/PriceSection";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHandHoldingDollar } from "react-icons/fa6";
import ProductList from "../components/ProductList";
// import Reviews from "../components/Reviews";
// import useAuth from "../hooks/useAuth";
// import { MdFavoriteBorder } from "react-icons/md";
// import { addToWishlist } from "../redux/features/productSlice";
import SEO from "../components/SEO";

const SingleProduct: FC = () => {
  const dispatch = useAppDispatch();
  const { productID } = useParams();
  const [product, setProduct] = useState<Product>();
  const [imgs, setImgs] = useState<string[]>();
  const [selectedImg, setSelectedImg] = useState<string>();
  const [sCategory, setScategory] = useState<string>();
  const [similar, setSimilar] = useState<Product[]>([]);
  // const { requireAuth } = useAuth();

  useEffect(() => {
    const fetchProductDetails = () => {
      fetch(`https://dhserver.vercel.app/products/${productID}`)
        .then((res) => res.json())
        .then((data) => {
          const { thumbnail, images, category } = data;
          setProduct(data);
          setImgs(images);
          setScategory(category);
          setSelectedImg(thumbnail);
        });
    };
    fetchProductDetails();
  }, [productID]);

  useEffect(() => {
    const fetchPreferences = (cat: string) => {
      fetch(`https://dhserver.vercel.app/products/category/${cat}`)
        .then((res) => res.json())
        .then((data) => {
          const _products: Product[] = data;
          const filtered = _products.filter((product) => {
            if (productID && product._id !== productID) return product;
          });
          setSimilar(filtered);
        });
    };
    if (sCategory && sCategory !== "") fetchPreferences(sCategory);
  }, [productID, sCategory]);

  const addCart = () => {
    if (product)
      dispatch(
        addToCart({
          _id: product._id,
          price: product.price,
          title: product.title,
          category: product.category,
          rating: product.rating,
          thumbnail: product.thumbnail,
          discountPercentage: product.discountPercentage,
        })
      );
    toast.success("item added to cart successfully", {
      duration: 3000,
    });
  };

  const buyNow = () => {
    if (product)
      dispatch(
        addToCart({
          _id: product._id,
          price: product.price,
          title: product.title,
          category: product.category,
          rating: product.rating,
          thumbnail: product.thumbnail,
          discountPercentage: product.discountPercentage,
        })
      );
    dispatch(setCartState(true));
  };

  // const addWishlist = () => {
  //   requireAuth(() => {
  //     if (product) {
  //       dispatch(addToWishlist(product));
  //       toast.success("item added to your wishlist", {
  //         duration: 3000,
  //       });
  //     }
  //   });
  // };

  return (
    <div className="container mx-auto pt-8">
      <SEO
        title={product?.title || "Premium Curtains"}
        description={product?.description || ""}
        keywords="curtains, পর্দা, প্রিমিয়াম-পর্দা, All-Products"
        image={
          imgs
            ? imgs[0]
            : "https://res.cloudinary.com/dqlmqakyt/image/upload/v1714495545/decorHeaven/file_1714495541890.png"
        }
        url="https://decorheaven.vercel.app/"
      />
      <div className="flex flex-col lg:flex-row  flex-wrap gap-5 px-4 font-karla">
        <div className="space-y-2 lg:w-6/12 flex flex-col justify-center items-center">
          <img src={selectedImg} alt="selected" className="h-80" />
          <div className="flex space-x-1 items-center">
            {imgs &&
              imgs.map((_img) => (
                <img
                  src={_img}
                  key={_img}
                  alt="thumb"
                  className={`w-12 cursor-pointer hover:border-2 hover:border-black ${
                    _img === selectedImg ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setSelectedImg(_img)}
                />
              ))}
          </div>
        </div>
        <div className="px-2 lg:w-5/12">
          <h2 className="text-2xl">{product?.title}</h2>
          {product?.rating && <RatingStar rating={product?.rating} />}
          <div className="mt-1">
            {product?.discountPercentage && (
              <PriceSection
                discountPercentage={product?.discountPercentage}
                price={product?.price}
              />
            )}
          </div>
          <table className="mt-2">
            <tbody>
              {/* <tr>
                <td className="pr-2 font-bold">Brand</td>
                <td>{product?.brand}</td>
              </tr> */}
              {/* <tr>
                <td className="pr-2 font-bold">Category</td>
                <td>{product?.category}</td>
              </tr> */}
              <tr>
                <td className="pr-1 font-bold ">Stock :</td>
                <td className="">{product?.stock}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2">
            <h2 className="font-bold text-lg">About the product</h2>
            <p className="leading-5 text-md">{product?.description}</p>
          </div>
          <div className="flex flex-wrap items-center jtc mt-4 mb-2 space-x-2">
            <button
              type="button"
              className="flex items-center space-x-1 mb-2 hover:bg-indigo-700 text-white p-2 rounded bg-indigo-500"
              onClick={addCart}
            >
              <AiOutlineShoppingCart />
              <span>ADD TO CART</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-1 mb-2 bg-zinc-800 text-white p-2 rounded hover:bg-zinc-900"
              onClick={buyNow}
            >
              <FaHandHoldingDollar />
              <span>BUY NOW</span>
            </button>
            {/* <button
              type="button"
              className="flex items-center space-x-1 mb-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700"
              onClick={addWishlist}
            >
              <MdFavoriteBorder />
              <span>ADD TO WISHLIST</span>
            </button> */}
          </div>
        </div>
        {/* {product && <Reviews id={product?._id} />} */}
      </div>
      <hr className="mt-4" />
      <ProductList title="Similar Products" products={similar} />
      <br />
    </div>
  );
};

export default SingleProduct;
