import formatRupees from "../../utils/formateRupees";
import AddButton from "../../components/common/AddButton";
import { Link } from "react-router-dom";
function CartItem({ item, onRemove, onQtyChange }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-[#1B2340]/10">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />

      <div className="flex-1">
        <Link to={`/products/${item._id}`}>
          <p className="font-medium">{item.name}</p>
        </Link>
        <p
          className="text-sm opacity-70"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {formatRupees(item.price)}
        </p>
      </div>

      <p
        className="text-right font-semibold"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {formatRupees(item.price * item.qty)}
      </p>

      <AddButton onQtyChange={onQtyChange} onRemove={onRemove} item={item} />      

      <button
        onClick={onRemove}
        aria-label="Remove item"
        className="flex items-center justify-center w-8 h-8 text-gray-400 rounded-lg transition-colors duration-200 hover:bg-red-50 hover:text-red-500 active:bg-red-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}

export default CartItem;
