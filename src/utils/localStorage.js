const CART_KEY = "apnacart_cart"

export function loadCart(){
    try{
        const data = localStorage.getItem(CART_KEY);
        return data? JSON.parse(data) : {items:[]}
    } catch(error){
        console.error("Failed to load cart from localStorage:", error)
        return { items:[] };
    }
}

export function saveCart(cartState){
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cartState));
    } catch (error) {
        console.error("Failed to save Cart to localStorage:", error);
    }
}

export function clearCartStorage(){
    try {
        localStorage.removeItem(CART_KEY);
    } catch (error) {
        console.error("Failed to clear Cart from localStorage:", error);
        
    }
}