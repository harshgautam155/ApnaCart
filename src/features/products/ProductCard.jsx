import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import formatRupees from "../../utils/formateRupees";
import { useState } from "react";

function ProductCard({ product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(0);
  const isOutOfStock = product.countInStock === 0;
  const isMaxQtyReached = quantity >= product.countInStock;

  const handleAddToCart = (e) => {
    e.preventDefault(); // stop the click from also triggering the wrapping Link
    addItem({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: 1,
    });
    setQuantity(quantity + 1);
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="group block rounded-lg border border-[#1B2340]/10 bg-white/60 overflow-hidden hover:border-[#D85A30] transition-colors"
    >
      <div className="relative aspect-square bg-[#1B2340]/5 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        {product.numReviews > 0 && (
          <div
            className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded text-xs font-medium"
            style={{ backgroundColor: "#1B2340", color: "#FDF1EC" }}
          >
            <span style={{ color: "#E8A33D" }}>★</span>
            <span>{product.rating?.toFixed(1)}</span>
            <span className="opacity-60">({product.numReviews})</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-wide opacity-50 mb-1">
          {product.category}
        </p>
        <h3 className="font-medium mb-2 line-clamp-1">{product.name}</h3>

        <div className="flex items-center justify-between">
          <span
            className="font-semibold"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {formatRupees(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isMaxQtyReached}
            className="text-xs font-medium px-3 py-1.5 rounded disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
            style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
          >
            {isOutOfStock
              ? "Out of stock"
              : isMaxQtyReached
                ? "Max limit"
                : "Add"}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
