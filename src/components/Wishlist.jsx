import React, { useContext, useState } from 'react';
import CartWishlistContext from './CartWishlistContext';
import CartWishlistItem from './CartWishlistItem';
import './styling/CartWishlistItem.css';

const Wishlist = () => {
    const { wishlist, handleMoveToCart, cart, removeFromWishlist} = useContext(CartWishlistContext);
    const [showAlert, setShowAlert] = useState(false);
    const [alertItem, setAlertItem] = useState(null);

    // useEffect(() => {
    //     console.log('Wishlist component rendered with showAlert:', showAlert);
    // }, [showAlert]);

    const handleMoveToCartWithPopup = (item) => {
        if (cart.some((cartItem) => cartItem.id === item.id)) {
            setAlertItem(item);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } else {
            handleMoveToCart(item, cart);
        }
    };

    return (
        <div>
            <h2>My Wishlist</h2>
            {wishlist ? (
                wishlist.length === 0 ? (
                    <p>Your wishlist is empty</p>
                ) : (
                    <div className="wishlist-items-container">
                        {wishlist.map((item) => (
                            <CartWishlistItem
                                key={item.id}
                                item={item}
                                cart={cart}
                                type="wishlist"
                                onMoveToCart={() => handleMoveToCartWithPopup(item)}
                                onRemove={() => removeFromWishlist(item.id)}
                            />
                        ))}
                        {showAlert && (
                            <div className="item-exists-popup">
                                <p>{alertItem.name} is already in your cart.</p>
                                <div onClick={() => setShowAlert(false)}>Close</div>
                            </div>
                        )}
                    </div>
                )
            ) : (
                <p>Loading wishlist...</p>
            )}
        </div>
    );
};

export default Wishlist;
