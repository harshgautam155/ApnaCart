import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "./productSlice";
import ProductCard from "./ProductCard";
import Loader from "../../components/common/Loader";
import { toast } from "react-toastify";

function ProductListPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const keyword = searchParams.get("keyword");

  const { products, status, error } = useSelector((state) => state.products);
  console.log("Products:", products); 
  useEffect(() => {
    dispatch(fetchProducts({ category, keyword }));
  }, [dispatch, category, keyword]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1
        className="text-4xl mb-8"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {category ? category : "All Products"}
      </h1>

      {status === "loading" && <Loader fullScreen={false} />}

      {status === "failed" && <ErrorMessage message={error} />}

      {status === "succeeded" && products.length === 0 && (
        <p className="text-center opacity-60 py-20">
          No products found{category ? ` in ${category}` : ""}.
        </p>
      )}

      {status === "succeeded" && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListPage;