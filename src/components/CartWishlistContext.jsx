import React, { createContext, useState,useEffect } from 'react';

const CartWishlistContext = createContext({
    cart: [],
    wishlist: [],
    addToCart: () => {},
    removeFromCart: () => {},
    addToWishlist: () => {},
    removeFromWishlist: () => {},
    handleMoveToCart: () => {},
    showAlert: false,
    setAlertItem: null,
    addToCartByQuantity: () => {},
});

export const CartWishlistProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [setShowAlert] = useState(false);
    const [setAlertItem] = useState(null);

    useEffect(() => {
        const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        const storedWishlistItems = JSON.parse(sessionStorage.getItem('wishlistItems')) || [];

        setCart(storedCartItems);
        setWishlist(storedWishlistItems);
    }, []); // Empty dependency array ensures it only runs on component mount

    // Save cart and wishlist to sessionStorage whenever they change
    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cart));
        sessionStorage.setItem('wishlistItems', JSON.stringify(wishlist));
    }, [cart, wishlist]);



    const handleMoveToCart = (item, cart) => {
        if (cart.some((cartItem) => cartItem.id === item.id)) {
            setAlertItem(item);
            setShowAlert(true);
            // Optional: Auto-close the popup after a few seconds
            setTimeout(() => setShowAlert(false), 3000);
            return;
        } else {
            // Item's not in cart
            moveToCart(item);
        }
    };
    

    const addToCart = (product) => {
        const itemExists = cart.find((item) => item.id === product.id);

        if (itemExists) {
            // Item already in cart, increase quantity
            setCart(cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            // New item, add with quantity of 1
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const addToCartByQuantity = (product, quantity) => {
        const itemExists = cart.find((item) => item.id === product.id);
        if (itemExists) {
            setCart(cart.map(item => item.id === product.id 
                              ? { ...item, quantity: item.quantity + quantity } 
                              : item));
        } else {
            setCart([...cart, { ...product, quantity: quantity }]);
        }
    };
    


    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };


    const addToWishlist = (product) => {
        const itemExists = wishlist.find((item) => item.id === product.id);

        if (itemExists) {
            // If item exists, increment quantity
            setWishlist(wishlist.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            // Otherwise, add as a new item with an initial quantity
            setWishlist([...wishlist, { ...product, quantity: 1 }]);
        }
    };


    const removeFromWishlist = (productId) => {
        setWishlist(wishlist.filter((item) => item.id !== productId));
    };

    const moveToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product.id);
    }

    return (
        <CartWishlistContext.Provider
            value={{ 
                cart, 
                wishlist, 
                addToCart, 
                removeFromCart, 
                addToWishlist, 
                removeFromWishlist, 
                moveToCart, 
                handleMoveToCart, 
                setShowAlert ,
                addToCartByQuantity
            }}
        >
            {children}
        </CartWishlistContext.Provider>
    );
};

export default CartWishlistContext;
