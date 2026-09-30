import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../API/Axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    
    // Persistent Cart State
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem("readora_cart");
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    });

    // Persistent Direct Buy Item State (for "Buy Now" flow)
    const [directBuyItem, setDirectBuyItemState] = useState(() => {
        try {
            const saved = localStorage.getItem("readora_direct_buy");
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    });

    // Sync cart state with localStorage
    useEffect(() => {
        try {
            if (cart && Object.keys(cart).length > 0) {
                localStorage.setItem("readora_cart", JSON.stringify(cart));
            }
        } catch (e) {
            console.error("Failed to save cart to localStorage", e);
        }
    }, [cart]);

    // Fetch user cart on login
    useEffect(() => {
        if (!user?._id) return;
        api
            .get(`/api/cart?userId=${user._id}`)
            .then((res) => {
                if (res.data) {
                    setCart(res.data);
                    localStorage.setItem("readora_cart", JSON.stringify(res.data));
                }
            })
            .catch((err) => console.error("Fetch cart error:", err));
    }, [user?._id]);

    // Save cart to DB
    const saveCartToDB = async (items) => {
        if (!user?._id) {
            // Guest mode fallback
            const localCart = { ...cart, items };
            setCart(localCart);
            localStorage.setItem("readora_cart", JSON.stringify(localCart));
            return;
        }
        try {
            const cleanItems = items.map((item) => ({
                book: item.book?._id || item.book,
                qty: item.qty || 1
            }));

            if (!cart._id) {
                const res = await api.post("/api/cart", {
                    userId: user._id,
                    items: cleanItems
                });
                setCart(res.data);
                localStorage.setItem("readora_cart", JSON.stringify(res.data));
            } else {
                const res = await api.patch(`/api/cart/${cart._id}`, {
                    items: cleanItems
                });
                setCart(res.data);
                localStorage.setItem("readora_cart", JSON.stringify(res.data));
            }
        } catch (err) {
            console.error("Cart save error:", err);
        }
    };

    // Add to cart
    const addToCart = async (book) => {
        if (!book) return;
        const exist = cart.items?.find((item) => (item.book?._id || item.book) === (book._id || book.id));
        let updatedItems;

        if (exist) {
            updatedItems = cart.items.map((item) =>
                (item.book?._id || item.book) === (book._id || book.id)
                    ? { ...item, qty: item.qty + 1 }
                    : item
            );
        } else {
            const newItem = { book: book._id ? book : book, qty: 1 };
            updatedItems = Array.isArray(cart.items) ? [...cart.items, newItem] : [newItem];
        }

        await saveCartToDB(updatedItems);
    };

    // Remove from cart
    const removeFromCart = async (id) => {
        const updatedItems = cart.items?.filter((item) => (item.book?._id || item.book) !== id);
        await saveCartToDB(updatedItems);
    };

    // Increase qty
    const increaseQty = async (id) => {
        const updatedItems = cart.items?.map((item) =>
            (item.book?._id || item.book) === id ? { ...item, qty: item.qty + 1 } : item
        );
        await saveCartToDB(updatedItems);
    };

    // Decrease qty
    const decreaseQty = async (id) => {
        const updatedItems = cart.items
            ?.map((item) =>
                (item.book?._id || item.book) === id ? { ...item, qty: item.qty - 1 } : item
            )
            .filter((item) => item.qty > 0);
        await saveCartToDB(updatedItems);
    };

    // Clear cart
    const clearCart = async () => {
        setCart({});
        localStorage.removeItem("readora_cart");
        if (cart._id) {
            try {
                await api.delete(`/api/cart/${cart._id}`);
            } catch (err) {
                console.error("Clear cart error:", err);
            }
        }
    };

    // Direct Buy Handlers ("Buy Now" flow)
    const setDirectBuy = (book) => {
        if (!book) return;
        const item = {
            book: book,
            qty: 1,
            price: book.price || 0
        };
        setDirectBuyItemState(item);
        localStorage.setItem("readora_direct_buy", JSON.stringify(item));
    };

    const clearDirectBuy = () => {
        setDirectBuyItemState(null);
        localStorage.removeItem("readora_direct_buy");
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                directBuyItem,
                setDirectBuy,
                clearDirectBuy,
                addToCart,
                removeFromCart,
                increaseQty,
                decreaseQty,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};