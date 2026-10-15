import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import formatRupees from "../../utils/formateRupees";
import { fetchProductDetails, clearSelectedProduct } from "./productSlice";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import ReviewForm from "./ReviewForm";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import AddButton from "../../components/common/AddButton";

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [showDescription, setShowDescription] = useState(false);

  const { product, detailsStatus, error } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProductDetails(id));
    return () => dispatch(clearSelectedProduct());
  }, [dispatch, id]);

  const handleAddToCart = () => {
    addItem({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    });
  };
  console.log("Product details:", product); // Log the product details for debugging
  const refetchProduct = () => {
    dispatch(fetchProductDetails(id));
  };

  if (detailsStatus === "loading") return <Loader />;
  if (detailsStatus === "failed") return <ErrorMessage message={error} />;
  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="aspect-square bg-[#1B2340]/5 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide opacity-50 mb-2">
            {product.category} · {product.brand}
          </p>
          <h1
            className="text-4xl mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {product.name}
          </h1>

          <div className="mt-10 flex items-center gap-4 mb-6">
            <span
              className=" text-2xl font-semibold"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {formatRupees(product.price)}
            </span>
            <span className="text-sm opacity-60">
              {product.countInStock > 0
                ? `${product.countInStock} in stock`
                : "Out of stock"}
            </span>
          </div>

          {product.countInStock > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <AddButton
                item={{ qty: qty, countInStock: product.countInStock }}
                onQtyChange={(newQty) => setQty(newQty)}
                onRemove={() => setQty(0)} // or handle removing from cart / resetting qty
              />

              <button
                onClick={handleAddToCart}
                className="px-6 py-2 rounded font-semibold"
                style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
              >
                Add to Cart
              </button>
            </div>
          )}

          {product.numReviews > 0 && (
            <p className="text-sm opacity-70">
              {product.rating?.toFixed(1)} ★ ({product.numReviews} reviews)
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowDescription((prev) => !prev)}
          className="mt-10 flex items-center justify-between w-full text-left font-medium text-sm py-2 border-b border-[#1B2340]/10"
        >
          Description
          <span
            className="transition-transform"
            style={{
              transform: showDescription ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▼
          </span>
        </button>

        {showDescription && (
          <p className="opacity-70 text-sm pt-3">{product.description}</p>
        )}
      </div>
      {/* Reviews */}
      <div className="mt-12 max-w-2xl">
        <h2
          className="text-2xl mb-4"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Reviews
        </h2>

        {product.reviews?.length === 0 && (
          <p className="opacity-60 text-sm">No reviews yet.</p>
        )}

        <div className="space-y-4">
          {product.reviews?.map((review) => (
            <div key={review._id} className="border-b border-[#1B2340]/10 pb-4">
              <p className="font-medium text-sm">{review.name}</p>
              <p className="text-sm opacity-70">{"★".repeat(review.rating)}</p>
              <p className="text-sm mt-1">{review.comment}</p>
            </div>
          ))}
        </div>

        {isAuthenticated ? (
          <ReviewForm productId={product._id} onReviewAdded={refetchProduct} />
        ) : (
          <p className="text-sm opacity-60 mt-6">Log in to write a review.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
