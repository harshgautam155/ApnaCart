const TAX_RATE = 0.15;
const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_COST = 30;

export function calculateItemPrice(cartItems) {
    return cartItems.reduce((acc, item) => acc+item.price * item.qty, 0);
}

export function calculateTaxPrice(itemPrice) {
    return Number((itemPrice * TAX_RATE).toFixed(2));
}

export function calculateShippingPrice(itemPrice) {
    return Number((itemPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST).toFixed(2));
}

export function calculatetotalPrice(itemPrice, taxPrice, shippingPrice) {
    return Number((itemPrice + taxPrice + shippingPrice).toFixed(2));
}

export function calculateCartTotals(cartItems) {
    const itemPrice = calculateItemPrice(cartItems);
    const tax = calculateTaxPrice(itemPrice);
    const shipping = calculateShippingPrice(itemPrice);
    const total = calculatetotalPrice(itemPrice, tax, shipping);

    return{
        itemPrice,
        tax,
        shipping,
        total
    }
}