
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProducts } from "../redux/features/productSlice";
import { useAppSelector } from "../redux/hooks";
import { BsSearch } from "react-icons/bs";

export default function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProducts = useAppSelector(
    (state) => state.productReducer.allProducts
  );

  const searchResults = (text: string) => {
    navigate("/products/");
    localStorage.setItem("category", "all");
    if (text === "") {
      fetch("http://localhost:8080/products?limit=100")
        .then((res) => res.json())
        .then(({ products }) => {
          dispatch(addProducts(products));
        });
    }
    const results = allProducts.filter((product) => {
      return product.title.toLowerCase().includes(text.trim().toLowerCase());
    });
    dispatch(addProducts(results));
  };
  return (
    <section>
      <div className="flex w-full max-w-[500px]">
        <input
          id="searchBox"
          onChange={(e) => searchResults(e.target.value)}
          type="text"
          placeholder="Search for a product..."
          className="border-2 border-indigo-500 rounded-l-xl px-6 py-2 w-full outline-none"
        />
        <div className="bg-indigo-500 text-white text-[26px] rounded-r-xl grid place-items-center px-4">
          <BsSearch />
        </div>
      </div>
    </section>
  );
}
