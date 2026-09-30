import React, { useEffect } from "react";
import { useCart } from "../components/Context/Cartcontext";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";
import { FaMapMarkerAlt, FaEdit } from "react-icons/fa";

function Checkout() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cart, directBuyItem } = useCart();

    // Redirect if not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Determine items to checkout (Direct Buy item takes precedence over regular Cart)
    const checkoutItems = directBuyItem
        ? [{ book: directBuyItem.book, qty: directBuyItem.qty || 1, _id: directBuyItem.book?._id || "direct" }]
        : (cart?.items || []);

    // Calculate total amount
    const totalAmount = checkoutItems.reduce(
        (total, item) =>
            total + Number(item.book?.price || item.price || 0) * (item.qty || 1),
        0
    );

    // Address verification & redirect preservation
    useEffect(() => {
        if (user && !user?.address?.address) {
            localStorage.setItem("readora_redirect_after_address", "/checkout");
            alert("Please add your delivery address before completing checkout.");
            navigate("/addreslist");
        }
    }, [user, navigate]);

    const handleEditAddress = () => {
        localStorage.setItem("readora_redirect_after_address", "/checkout");
        navigate("/addreslist");
    };

    // Proceed to payment selection
    const handlePlaceOrder = () => {
        if (!user?.address?.address) {
            localStorage.setItem("readora_redirect_after_address", "/checkout");
            alert("Please add your delivery address before completing checkout.");
            navigate("/addreslist");
            return;
        }
        if (checkoutItems.length === 0) {
            alert("Your checkout list is empty.");
            return;
        }
        navigate("/payment");
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] py-10 sm:py-14 px-4 transition-colors duration-300">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Heading */}
                <div className="bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100">
                            Checkout
                        </h1>
                        {directBuyItem && (
                            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                                Direct Purchase Mode
                            </span>
                        )}
                    </div>
                </div>

                {/* Address Section */}
                <div className="bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-serif font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-indigo-600 dark:text-indigo-400 text-base" />
                            Delivery Address
                        </h2>

                        <button
                            onClick={handleEditAddress}
                            className="flex items-center gap-1.5 text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                        >
                            <FaEdit />
                            {user?.address?.address ? "Change" : "Add Address"}
                        </button>
                    </div>

                    <div className="text-slate-700 dark:text-slate-300 space-y-2 text-sm">
                        <p>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">Name:</span>{" "}
                            {user?.name}
                        </p>

                        <p>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">Phone:</span>{" "}
                            {user?.phone || "Not specified"}
                        </p>
                        
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                            {user?.address?.address ? (
                                <>
                                    <p>
                                        <span className="font-semibold text-slate-900 dark:text-slate-100">Address:</span>{" "}
                                        {user.address.address}
                                    </p>
                                    <p className="text-slate-500 dark:text-slate-400">
                                        {user.address.hometown ? `${user.address.hometown}, ` : ''}
                                        {user.address.post ? `${user.address.post} (PO)` : ''}
                                    </p>
                                    <p className="text-slate-500 dark:text-slate-400">
                                        Pincode: {user.address.pincode}
                                    </p>
                                </>
                            ) : (
                                <p className="text-rose-500 font-medium">
                                    No delivery address saved. Please add an address to continue.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-serif font-semibold text-slate-900 dark:text-slate-100 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                        Order Items
                    </h2>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {checkoutItems.length > 0 ? (
                            checkoutItems.map((item, index) => {
                                const book = item.book || item;
                                return (
                                    <div
                                        key={item._id || index}
                                        className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                                    >
                                        {/* Left Side */}
                                        <div className="flex items-center gap-4">
                                            {book?.img ? (
                                                <img
                                                    src={book.img}
                                                    alt={book.title}
                                                    className="w-16 h-24 sm:w-20 sm:h-28 object-cover rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50"
                                                />
                                            ) : (
                                                <div className="w-16 h-24 sm:w-20 sm:h-28 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-400">
                                                    No Cover
                                                </div>
                                            )}

                                            <div>
                                                <h3 className="font-serif font-semibold text-base sm:text-lg text-slate-900 dark:text-slate-100 line-clamp-1">
                                                    {book?.title || "Untitled Book"}
                                                </h3>

                                                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">
                                                    Qty: {item.qty || 1}
                                                </p>

                                                {book?.author && (
                                                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                                                        by {book.author}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right Side */}
                                        <div className="text-right">
                                            <p className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                                ₹{book?.price || 0}
                                            </p>

                                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                                                Subtotal: ₹
                                                {(book?.price || 0) * (item.qty || 1)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-slate-500 dark:text-slate-400 py-4 text-center">
                                No items found in checkout list.
                            </p>
                        )}
                    </div>
                </div>

                {/* Total */}
                <div className="bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">
                            Total Amount
                        </h2>

                        <p className="text-xl sm:text-2xl font-serif font-bold text-indigo-600 dark:text-indigo-400">
                            ₹{totalAmount}
                        </p>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-indigo-500/20 active:scale-[0.99] transition-all duration-200 min-h-[44px]"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;