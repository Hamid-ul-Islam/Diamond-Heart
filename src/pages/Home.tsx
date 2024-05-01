import { FC, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import TrendingProducts from "../components/TrendingProducts";
import { useAppDispatch } from "../redux/hooks";
import {
  updateNewList,
  updateFeaturedList,
} from "../redux/features/productSlice";
import { Product } from "../models/Product";
import LatestProducts from "../components/LatestProducts";
import Banner from "../components/Banner";
import SEO from "../components/SEO";

const Home: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProducts = () => {
      fetch("https://dhserver.vercel.app/products?limit=24")
        .then((res) => res.json())
        .then((products) => {
          const productList: Product[] = [];
          products.forEach((product: Product) => {
            productList.push({
              _id: product._id,
              title: product.title,
              images: product.images,
              price: product.price,
              rating: product.rating,
              thumbnail: product.thumbnail,
              description: product.description,
              category: product.category,
              discountPercentage: product.discountPercentage,
            });
          });
          dispatch(updateFeaturedList(productList.slice(0, 8)));
          dispatch(updateNewList(productList.slice(4, 8)));
        });
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <>
      <SEO
        title="DH | Premium Curtains shop"
        description="All premium curtains."
        keywords="curtains, পর্দা, প্রিমিয়াম-পর্দা"
        image="https://res.cloudinary.com/dqlmqakyt/image/upload/v1714495545/decorHeaven/file_1714495541890.png"
        url="https://decorheaven.vercel.app/"
      />
      <HeroSection />
      <Features />
      <TrendingProducts />
      <Banner />
      <LatestProducts />
      <br />
    </>
  );
};

export default Home;
