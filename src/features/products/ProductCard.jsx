import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const { addItem } = useCart();

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
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="group block rounded-lg border border-[#1B2340]/10 bg-white/60 overflow-hidden hover:border-[#D85A30] transition-colors"
    >
      <div className="aspect-square bg-[#1B2340]/5 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
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
            ₹{product.price}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="text-xs font-medium px-3 py-1.5 rounded disabled:opacity-40"
            style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
          >
            {product.countInStock === 0 ? "Out of stock" : "Add"}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;