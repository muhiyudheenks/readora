import React, { useEffect, useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa6';
import { useCart } from '../Context/Cartcontext';
import { FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useWishList } from '../Context/WishListContext';
import api from '../../API/Axios';

function TopBooks() {
    const { addToWishList } = useWishList();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [topproducts, setTopproducts] = useState([]);


    const [currentpage, setCurrentpage] = useState(1)
    const itemsperpage = 3;
    useEffect(() => {
        api.get("/api/bestbooks")
            .then((res) => setTopproducts(res.data))
            .catch((err) => console.error(err))
    }, []);
    if (topproducts.length === 0) {
        return <div>Loading...</div>;
    }
    const lastindex = currentpage * itemsperpage;
    const firstindex = lastindex - itemsperpage;
    const currentitems = topproducts.slice(firstindex, lastindex);
    const totalpages = Math.ceil(topproducts.length / itemsperpage)


    return (
        <div className='py-16 sm:py-20 bg-slate-50 dark:bg-[#0a0a0f] transition-colors duration-300'>
            <div className='container mx-auto px-4'>
                {/* Header */}
                <div className='text-center mb-12 max-w-2xl mx-auto'>
                    <span data-aos="fade-up" className='inline-block text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-3'>Top Rated</span>
                    <h2 data-aos="fade-up" className='text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-3'>Best Books</h2>
                    <p className='text-sm text-slate-500 dark:text-slate-400 leading-relaxed'>Discover books that inspire, educate, and transport you to new worlds. Readora is your modern home for stories, knowledge, and imagination.</p>
                </div>
                {/* Body */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 place-items-center'>
                    {currentitems.map((item) => (
                        <div key={item._id} data-aos="zoom-in"
                            className='group relative bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-card-light dark:shadow-card-dark hover:-translate-y-2 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all duration-300 w-full max-w-[280px] flex flex-col overflow-hidden'>
                            {/* Wishlist button */}
                            <button onClick={() => addToWishList(item)}
                                aria-label="Add to wishlist"
                                className='absolute top-3 right-3 z-10 bg-white dark:bg-slate-800 p-2 rounded-full shadow-md text-rose-400 hover:text-rose-600 dark:hover:text-rose-400 hover:scale-110 transition-all duration-200 border border-slate-100 dark:border-slate-700'>
                                <FaHeart className="text-sm" />
                            </button>
                            {/* Image */}
                            <div className='w-full flex items-center justify-center h-[180px] bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/30 pt-6 pb-4'>
                                <img src={item.img} alt={item.title}
                                    className='w-[120px] h-[155px] object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md'
                                />
                            </div>
                            {/* Details */}
                            <div className='p-5 flex flex-col flex-grow'>
                                <h3 className='text-base font-bold text-slate-900 dark:text-slate-100 mb-1 line-clamp-1'>{item.title}</h3>
                                <p className='text-slate-500 dark:text-slate-400 text-xs line-clamp-2 mb-3 leading-relaxed flex-grow'>
                                    {item.description}
                                </p>
                                <div className='flex items-center justify-between mb-3'>
                                    <span className='text-lg font-bold text-indigo-600 dark:text-indigo-400'>₹{item.price}</span>
                                    <div className='flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full border border-amber-200 dark:border-amber-800/40'>
                                        <FaStar className="text-amber-400 text-xs" />
                                        <span className='text-xs font-semibold text-amber-700 dark:text-amber-400'>{item.rating}</span>
                                    </div>
                                </div>
                                <div className='flex gap-2 mt-auto'>
                                    {user &&
                                        <button onClick={() => navigate("/chekout")}
                                            className='flex-1 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-sm font-semibold py-2 px-3 rounded-xl hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200'>
                                            Buy Now
                                        </button>
                                    }
                                    {user && (
                                        <button onClick={() => addToCart(item)}
                                            aria-label="Add to cart"
                                            className='bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:scale-105 transition-all duration-200'>
                                            <FaShoppingCart className="text-sm" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-12">
                    {[...Array(totalpages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentpage(index + 1)}
                            className={`w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200 ${currentpage === index + 1
                                ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border border-slate-200 dark:border-slate-700'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopBooks
