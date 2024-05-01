import { FC, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { addCategories, addProducts } from "../redux/features/productSlice";
import ProductCard from "../components/ProductCard";
import { Product } from "../models/Product";
import SearchBar from "../components/SearchBar";
import SEO from "../components/SEO";

const AllProducts: FC = () => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState("all");
  const sortRef = useRef<HTMLSelectElement>(null);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const allProducts = useAppSelector(
    (state) => state.productReducer.allProducts
  );
  const allCategories = useAppSelector(
    (state) => state.productReducer.categories
  );

  useEffect(() => {
    if (localStorage.getItem("category")) {
      setCategory(localStorage.getItem("category") as string);
    } else {
      localStorage.setItem("category", "all");
    }
    const fetchProducts = () => {
      fetch("https://dhserver.vercel.app/products?limit=100")
        .then((res) => res.json())
        .then((products) => {
          dispatch(addProducts(products));
        });
    };
    const fetchCategories = () => {
      fetch("https://dhserver.vercel.app/products/categories")
        .then((res) => res.json())
        .then((data) => {
          dispatch(addCategories(data));
        });
    };
    if (allProducts?.length === 0) fetchProducts();
    if (allCategories?.length === 0) fetchCategories();
  }, [allProducts, allCategories, dispatch]);

  useEffect(() => {
    setCurrentProducts(allProducts);
  }, [allProducts]);

  useEffect(() => {
    if (category !== "all") {
      const updated = allProducts.filter((pro) => pro.category === category);
      setCurrentProducts(updated);
    }
  }, [category, allProducts]);

  const sortProducts = (sortValue: string) => {
    if (sortValue === "asc") {
      setCurrentProducts(
        [...currentProducts].sort((a, b) => {
          const aPrice =
            a.price - (a.price * (a.discountPercentage ?? 0)) / 100;
          const bPrice =
            b.price - (b.price * (b.discountPercentage ?? 0)) / 100;
          return aPrice - bPrice;
        })
      );
    } else if (sortValue === "desc") {
      setCurrentProducts(
        [...currentProducts].sort((a, b) => {
          const aPrice =
            a.price - (a.price * (a.discountPercentage ?? 0)) / 100;
          const bPrice =
            b.price - (b.price * (b.discountPercentage ?? 0)) / 100;
          return bPrice - aPrice;
        })
      );
    } else {
      setCurrentProducts(
        [...currentProducts].sort((a, b) => a.price - b.price)
      );
    }
  };

  return (
    <div className="container mx-auto min-h-[83vh] px-4 font-karla">
      <SEO
        title="All Products | All Premium Curtains"
        description="All premium curtains."
        keywords="curtains, পর্দা, প্রিমিয়াম-পর্দা, All-Products"
        image="https://res.cloudinary.com/dqlmqakyt/image/upload/v1714495545/decorHeaven/file_1714495541890.png"
        url="https://decorheaven.vercel.app/"
      />
      <div className="grid lg:grid-cols-5 gap-1">
        <div className="col-span-1 hidden lg:block pt-5">
          <h1 className="font-bold mb-2">Categories</h1>
          <div className="space-y-1">
            {allCategories?.map((_category) => (
              <div
                key={_category}
                className={`cursor-pointer hover:text-indigo-500 ${
                  _category === category ? "text-indigo-500" : ""
                }`}
                onClick={() => {
                  setCategory(_category);
                  if (sortRef && sortRef.current)
                    sortRef.current.value = "default";
                  sortProducts("default");
                }}
              >
                {_category}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4 space-y-4 pb-10">
          <div className=" hidden lg:block">
            <div className="flex items-center justify-between pt-5">
              <div className="flex items-center space-x-2 text-lg">
                <span>Products</span>
                <span> {">"} </span>
                <span className="font-bold">{category}</span>
              </div>
              <select
                ref={sortRef}
                className="border border-black rounded p-1"
                onChange={(e) => sortProducts(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="asc">Price (low to high)</option>
                <option value="desc">Price (high to low)</option>
              </select>
            </div>
          </div>
          <div className="lg:hidden">
            <SearchBar />
          </div>
          <div className="lg:hidden">
            <div className="flex items-center gap-3">
              <h1 className="font-bold">Categories</h1>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (sortRef && sortRef.current)
                    sortRef.current.value = "default";
                  sortProducts("default");
                }}
                className="w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">all</option>
                {allCategories?.map((_category) => (
                  <option
                    value={_category}
                    key={_category}
                    className={`cursor-pointer hover:text-indigo-500 ${
                      _category === category ? "text-indigo-500" : ""
                    }`}
                  >
                    {_category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
            {currentProducts?.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
