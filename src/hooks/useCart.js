import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  updateQty,
  clearCart,
} from "../features/cart/cartSlice";
import { calculateCartTotals } from "../utils/priceCalculation";

export function useCart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items) || [];

  const { itemPrice, tax, shipping, total } = calculateCartTotals(items);

  const totalQty = items.reduce((acc, item) => acc + item.qty, 0);

  return {
    items,
    itemPrice,
    tax,
    shipping,
    total,
    totalQty,
    addItem: (item) => dispatch(addItem(item)),
    removeItem: (productId) => dispatch(removeItem(productId)),
    updateQty: (product, qty) => dispatch(updateQty({ product, qty })),
    clearCart: () => dispatch(clearCart()),
  };
}
