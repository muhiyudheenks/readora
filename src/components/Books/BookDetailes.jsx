import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { FaArrowLeft, FaHeart, FaStar } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { useWishList } from '../Context/WishListContext';
import { useCart } from '../Context/Cartcontext';
import { useAuth } from '../Context/AuthContext';
import api from '../../API/Axios';

function BookDetailes() {
    const [currentbook, setCurrentbook] = useState({});
    const { id } = useParams();
    const { addToWishList } = useWishList();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        api.get(`/api/books/${id}`)
            .then((res) => setCurrentbook(res.data))
            .catch((error) => console.error(error));
    }, [id]);
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] py-10 sm:py-14 px-4 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 font-medium text-sm transition-colors duration-200 group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                    Back
                </button>

                {/* Main card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 rounded-2xl shadow-md">

                    {/* Book Image */}
                    <div className="flex justify-center items-start">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/15 to-cyan-500/15 rounded-2xl blur-xl transform scale-95"></div>
                            <img
                                src={currentbook.img}
                                alt={currentbook.title}
                                className="relative w-[200px] h-[290px] sm:w-[240px] sm:h-[340px] object-cover rounded-2xl shadow-2xl border border-white/20 dark:border-slate-800"
                            />
                        </div>
                    </div>

                    {/* Book Info */}
                    <div className="space-y-4 flex flex-col justify-center">
                        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 leading-tight">{currentbook.title}</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">by {currentbook.author}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800/40">
                                <FaStar className="text-amber-400 text-sm" />
                                <span className="font-semibold text-amber-700 dark:text-amber-400 text-sm">{currentbook.rating}</span>
                            </div>
                            <span className="text-slate-400 text-sm">Reviews</span>
                        </div>

                        {/* Category */}
                        <span className="inline-block bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 px-3 py-1 rounded-full text-xs font-semibold w-fit tracking-wide">
                            {currentbook.category}
                        </span>

                        {/* Price */}
                        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                            ₹{currentbook.price}
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                            {currentbook.description}
                        </p>

                        {/* Actions */}
                        {user && (
                            <div className="flex flex-wrap gap-3 pt-2">
                                <button onClick={() => navigate("/chekout")}
                                    className="flex-1 sm:flex-none bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm touch-target">
                                    Buy Now
                                </button>
                                <button onClick={() => addToCart(currentbook)}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-indigo-300 dark:border-indigo-700/60 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-5 py-3 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-all duration-200 font-semibold text-sm touch-target">
                                    <FaShoppingCart /> Add to Cart
                                </button>
                                <button onClick={() => addToWishList(currentbook)}
                                    aria-label="Add to wishlist"
                                    className="p-3 rounded-xl border border-rose-200 dark:border-rose-800/40 text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 hover:scale-105 transition-all duration-200 touch-target">
                                    <FaHeart />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetailes
