import React, { useState } from "react";

function OrderSummary({ cartItems }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        payment: "cod"
    });

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.qty,
        0
    );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Order Placed:", formData, cartItems);
        alert("Order placed successfully!");
    };
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] py-10 sm:py-14 px-4 transition-colors duration-300">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* LEFT – SHIPPING FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4"
                >
                    <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                        Shipping Details
                    </h2>

                    <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="+91 9876543210"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">Address</label>
                        <textarea
                            name="address"
                            placeholder="Full street address..."
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">City</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="Kochi"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                placeholder="682001"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* PAYMENT */}
                    <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">Payment Method</label>
                        <select
                            name="payment"
                            value={formData.payment}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        >
                            <option value="cod">Cash on Delivery</option>
                            <option value="upi">UPI</option>
                            <option value="card">Credit / Debit Card</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-indigo-500/20 active:scale-[0.99] transition-all duration-200 min-h-[44px] mt-2"
                    >
                        Place Order
                    </button>
                </form>

                {/* RIGHT – ORDER SUMMARY */}
                <div className="bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm h-fit">
                    <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                        Order Summary
                    </h2>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800/80 mb-6">
                        {cartItems.map(item => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center py-3 text-sm text-slate-700 dark:text-slate-300"
                            >
                                <span className="font-medium text-slate-800 dark:text-slate-200">{item.title} <span className="text-slate-400">× {item.qty}</span></span>
                                <span className="font-semibold text-slate-900 dark:text-slate-100">₹ {item.price * item.qty}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700/80 flex justify-between items-center font-serif text-xl font-bold text-slate-900 dark:text-slate-100">
                        <span>Total</span>
                        <span className="text-indigo-600 dark:text-indigo-400">₹ {totalPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;
