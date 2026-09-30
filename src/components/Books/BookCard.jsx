import React, { useState } from 'react';
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaBolt } from 'react-icons/fa';

/**
 * BookCard Component
 * Displays a book item with image, title, author, price, rating, wishlist toggle,
 * and quick action buttons ('Add to Cart' & 'Buy Now').
 */
const BookCard = ({
    book,
    isFavorite: initialIsFavorite = false,
    onAddToCart,
    onBuyNow,
    onToggleFavorite
}) => {
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

    if (!book) return null;

    const {
        _id,
        id,
        title = "Untitled Book",
        author = "Unknown Author",
        price = 0,
        rating = 4.5,
        img,
        aosDelay = 0
    } = book;

    const bookId = _id || id;

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite((prev) => !prev);
        if (onToggleFavorite) {
            onToggleFavorite(bookId, !isFavorite);
        } else {
            console.log("Favorite toggled for book:", bookId);
        }
    };

    const handleAddToCartClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onAddToCart) {
            onAddToCart(book);
        } else {
            console.log("Add to Cart clicked for book:", bookId);
        }
    };

    const handleBuyNowClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onBuyNow) {
            onBuyNow(book);
        } else {
            console.log("Buy Now clicked for book:", bookId);
        }
    };

    return (
        <div
            data-aos="fade-up"
            data-aos-delay={aosDelay}
            className="group relative bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800/90 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
        >
            {/* Top Right Favorite / Wishlist Button */}
            <button
                type="button"
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                    isFavorite
                        ? "bg-rose-500/10 dark:bg-rose-500/20 text-rose-500 hover:scale-110 shadow-sm"
                        : "bg-slate-900/5 dark:bg-slate-100/10 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:scale-110"
                }`}
            >
                {isFavorite ? (
                    <FaHeart className="w-4 h-4 text-rose-500 fill-current" />
                ) : (
                    <FaRegHeart className="w-4 h-4 transition-colors" />
                )}
            </button>

            {/* Book Image & Rating */}
            <div className="flex flex-col items-center">
                <div className="relative mb-3.5 w-full flex justify-center pt-2">
                    {img ? (
                        <img
                            src={img}
                            alt={title}
                            className="h-[170px] sm:h-[195px] w-auto max-w-[130px] sm:max-w-[145px] object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="h-[170px] w-[130px] bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center rounded-xl text-xs font-medium">
                            No Cover
                        </div>
                    )}
                </div>

                {/* Info Container */}
                <div className="w-full text-center flex flex-col">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        by <span className="font-medium">{author}</span>
                    </p>

                    {/* Price and Rating Row */}
                    <div className="flex items-center justify-between mt-3 px-1">
                        <span className="text-base sm:text-lg font-serif font-extrabold text-indigo-600 dark:text-indigo-400">
                            ₹{price}
                        </span>

                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-800/40">
                            <FaStar className="text-amber-400 text-xs" />
                            <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                                {rating}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Interactive Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <button
                    type="button"
                    onClick={handleAddToCartClick}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800/60 rounded-xl transition-all duration-200 active:scale-95 min-h-[38px]"
                >
                    <FaShoppingCart className="text-xs" />
                    <span>Add to Cart</span>
                </button>

                <button
                    type="button"
                    onClick={handleBuyNowClick}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-sm hover:shadow-indigo-500/20 rounded-xl transition-all duration-200 active:scale-95 min-h-[38px]"
                >
                    <FaBolt className="text-xs" />
                    <span>Buy Now</span>
                </button>
            </div>
        </div>
    );
};

export default BookCard;
