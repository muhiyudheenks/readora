import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../API/Axios";
import { useAuth } from "./AuthContext";

const WishListContext = createContext(null);

export const useWishList = () => {
    const context = useContext(WishListContext);
    if (!context) {
        throw new Error("useWishList must be used within a WishListProvider");
    }
    return context;
};

export const WishListProvider = ({ children }) => {
    const { user } = useAuth();
    const [wishList, setWishList] = useState(() => {
        try {
            const saved = localStorage.getItem("readora_wishlist");
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    // Helper: Normalize book ID
    const getBookId = (item) => item?._id || item?.id || item?.book?._id || item?.book;

    // Save to LocalStorage whenever wishList changes
    useEffect(() => {
        try {
            localStorage.setItem("readora_wishlist", JSON.stringify(wishList));
        } catch (e) {
            console.error("Failed to save wishlist to localStorage", e);
        }
    }, [wishList]);

    // Fetch wishlist from backend on user login
    useEffect(() => {
        if (!user?._id) return;

        api.get(`/api/wishlist/${user._id}`)
            .then((res) => {
                const fetched = res.data.wishlist || [];
                setWishList(fetched);
                localStorage.setItem("readora_wishlist", JSON.stringify(fetched));
            })
            .catch((err) => console.error("Wishlist fetch error:", err));
    }, [user?._id]);

    // Check if book is in wishlist
    const isInWishList = (bookId) => {
        if (!bookId) return false;
        return wishList.some((item) => getBookId(item) === bookId);
    };

    // Toggle Wishlist (Add if absent, Remove if present - unique entries)
    const toggleWishList = async (book) => {
        if (!book) return;
        const bId = getBookId(book);
        const exists = isInWishList(bId);

        let updatedList;
        if (exists) {
            // Remove
            updatedList = wishList.filter((item) => getBookId(item) !== bId);
        } else {
            // Add unique
            updatedList = [...wishList, book];
        }

        setWishList(updatedList);
        localStorage.setItem("readora_wishlist", JSON.stringify(updatedList));

        // Sync with backend if user logged in
        if (user?._id) {
            try {
                await api.post(`/api/wishlist`, {
                    userId: user._id,
                    bookId: bId
                });
                const res = await api.get(`/api/wishlist/${user._id}`);
                if (res.data?.wishlist) {
                    setWishList(res.data.wishlist);
                    localStorage.setItem("readora_wishlist", JSON.stringify(res.data.wishlist));
                }
            } catch (err) {
                console.error("Wishlist API sync error:", err);
            }
        }
    };

    // Add to wishlist
    const addToWishList = (book) => {
        if (!isInWishList(getBookId(book))) {
            toggleWishList(book);
        }
    };

    // Remove from wishlist
    const removeFromWishList = (bookId) => {
        const targetBook = wishList.find((item) => getBookId(item) === bookId);
        if (targetBook || isInWishList(bookId)) {
            const updated = wishList.filter((item) => getBookId(item) !== bookId);
            setWishList(updated);
            localStorage.setItem("readora_wishlist", JSON.stringify(updated));

            if (user?._id) {
                api.post(`/api/wishlist`, { userId: user._id, bookId })
                    .catch((err) => console.error("Remove from wishlist API error:", err));
            }
        }
    };

    return (
        <WishListContext.Provider
            value={{
                wishList,
                isInWishList,
                toggleWishList,
                addToWishList,
                removeFromWishList
            }}
        >
            {children}
        </WishListContext.Provider>
    );
};
