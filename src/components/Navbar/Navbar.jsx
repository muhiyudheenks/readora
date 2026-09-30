import React, { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/Cartcontext';
import { FaCartShopping, FaHeart } from 'react-icons/fa6';
import { useWishList } from '../Context/WishListContext';
import { HiMenu, HiX } from 'react-icons/hi';
import Darkmode from './Darkmode';

const navbar = [
    { id: "6817", name: "Home", path: "/" },
    { id: "dbf4", name: "All Category", path: "/Allcategory" },
    { id: "ca21", name: "About", path: "/aboutus" },
    { id: "76ae", name: "Contact Us", path: "/contactus" }
];

function Navbar() {
    const { wishList } = useWishList();
    const { cart } = useCart();
    const { user, logout } = useAuth();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = () => {
        logout();
        setOpen(false);
        navigate('/login');
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            navigate(`/books?title=${searchTerm}`);
        }
    };

    return (
        <div className="bg-glass sticky top-0 z-40 transition-all duration-300 shadow-sm dark:shadow-none">

            {/* upper navbar */}
            <div className="py-3">
                <div className="container mx-auto flex justify-between items-center px-4">

                    {/* logo */}
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="font-serif font-bold text-2xl sm:text-3xl flex gap-2.5 items-center text-gradient group">
                        <img
                            className="w-9 h-9 sm:w-10 sm:h-10 object-cover cursor-pointer rounded-full shadow-md group-hover:scale-105 transition-transform duration-300"
                            src="/images/logo1.png"
                            alt="logo"
                        />
                        <span className="tracking-tight">Readora</span>
                    </a>

                    {/* right section */}
                    <div className="flex items-center gap-3 sm:gap-4">

                        {/* search - hidden on mobile */}
                        <div className="relative group hidden sm:block">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search books..."
                                className='rounded-full py-2 pl-4 pr-10 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 w-44 md:w-56 focus:w-64 text-sm'
                            />
                            <IoIosSearch className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xl group-focus-within:text-indigo-600 dark:group-focus-within:text-cyan-400 transition-colors duration-300" />
                        </div>

                        {/* Theme Switcher */}
                        <Darkmode />

                        {/* wishlist */}
                        {user &&
                            <button onClick={() => navigate("/wishlist")}
                                aria-label="View Wishlist"
                                className='relative bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-500/50 text-indigo-600 dark:text-indigo-400 p-2.5 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group touch-target'>
                                <FaHeart className="text-lg group-hover:scale-110 transition-transform" />
                                {wishList.length > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                                        {wishList.length}
                                    </span>
                                )}
                            </button>
                        }

                        {/* cart */}
                        {user &&
                            <button onClick={() => navigate("/cartlist")}
                                aria-label="View Cart"
                                className='relative bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-500/50 text-indigo-600 dark:text-indigo-400 p-2.5 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group touch-target'>
                                <FaCartShopping className="text-lg group-hover:scale-110 transition-transform" />
                                {cart.items?.length > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                                        {cart.items?.length}
                                    </span>
                                )}
                            </button>
                        }

                        {/* USER / LOGIN */}
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <IoPersonCircle
                                    className="text-4xl cursor-pointer text-indigo-600 dark:text-indigo-400 hover:text-cyan-500 transition-all duration-300 hover:scale-105"
                                    onClick={() => setOpen(!open)}
                                />
                                {open && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#12131c] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 py-1">
                                        <button
                                            onClick={() => { navigate('/profile'); setOpen(false); }}
                                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
                                        >
                                            Profile
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors duration-150"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-medium py-2 px-5 rounded-full shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 text-sm"
                            >
                                Sign In
                            </button>
                        )}

                        {/* Hamburger - mobile only */}
                        <button
                            className="sm:hidden text-2xl text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors p-1 rounded-lg touch-target"
                            aria-label="Toggle Navigation Menu"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <HiX /> : <HiMenu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="sm:hidden px-4 pt-3 pb-1">
                    <div className="relative group">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search books..."
                            className='w-full rounded-full py-2 pl-4 pr-10 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm'
                        />
                        <IoIosSearch className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xl" />
                    </div>
                </div>
            </div>

            {/* Desktop lower navbar */}
            <div className="hidden sm:flex justify-center pb-2.5 pt-1 border-t border-slate-100 dark:border-slate-800/40">
                <ul className="flex gap-8">
                    {navbar.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => navigate(item.path)}
                                className="relative text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-100 font-medium transition-colors duration-300 group py-1"
                            >
                                {item.name}
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="sm:hidden bg-white/95 dark:bg-[#0b0c10]/95 backdrop-blur-xl px-4 pb-4 border-b border-slate-200 dark:border-slate-800 absolute w-full shadow-xl left-0 top-full z-50 animate-in slide-in-from-top-2 duration-200">
                    <ul className="flex flex-col gap-1 pt-3">
                        {navbar.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => { navigate(item.path); setMenuOpen(false); }}
                                    className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl font-medium transition-all duration-200 touch-target justify-start"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Navbar;