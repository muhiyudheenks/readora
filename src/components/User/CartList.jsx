

import { useCart } from "../Context/Cartcontext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function CartList() {
    const { user } = useAuth();
    const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="container mt-20 text-center">
                <h2 className="text-2xl font-bold">Your cart is empty 🛒</h2>
            </div>
        );
    }

    const totalPrice = cart.items?.reduce(
        (sum, item) => sum + (item.book?.price || 0) * item.qty,
        0
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] py-10 sm:py-14 px-4 transition-colors duration-300">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-8">Your Cart</h1>

                <div className="space-y-4 mb-8">
                    {cart.items?.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-start sm:items-center gap-4 bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm"
                        >
                            {/* Image */}
                            <img
                                src={item.book?.img}
                                alt={item.book?.title}
                                className="w-16 h-24 sm:w-20 sm:h-28 object-cover rounded-xl flex-shrink-0 shadow-sm"
                            />

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">{item.book?.title}</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{item.book?.author}</p>
                                <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-1 text-base">₹{item.book?.price}</p>
                            </div>

                            {/* Quantity + Remove */}
                            <div className="flex flex-col items-end gap-3 flex-shrink-0">
                                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                                    <button
                                        onClick={() => decreaseQty(item.book?._id)}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 shadow-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors"
                                    >
                                        <FaMinus className="text-xs" />
                                    </button>
                                    <span className="font-bold text-slate-900 dark:text-slate-100 w-6 text-center text-sm">{item.qty}</span>
                                    <button
                                        onClick={() => increaseQty(item.book?._id)}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 shadow-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors"
                                    >
                                        <FaPlus className="text-xs" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.book?._id)}
                                    className="text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 p-1 transition-colors"
                                    aria-label="Remove item"
                                >
                                    <FaTrash className="text-sm" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total & Actions */}
                <div className="bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Total</span>
                        <span className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">₹{totalPrice}</span>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => clearCart()}
                            className="flex-1 border border-rose-300 dark:border-rose-700/60 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 py-3 rounded-xl font-semibold text-sm hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all duration-200 touch-target">
                            Clear Cart
                        </button>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="flex-1 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 touch-target">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartList;