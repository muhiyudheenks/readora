import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/Context/Cartcontext";
import { useAuth } from "../components/Context/AuthContext";
import api from "../API/Axios";
import { useOrder } from "../components/Context/OrderContext";

function Payment() {
    const [method, setMethod] = useState("COD");
    const navigate = useNavigate();
    const { cart, clearCart, directBuyItem, clearDirectBuy } = useCart();
    const { user } = useAuth();
    const { orders, setOrders } = useOrder();

    // handleRazorpay
    const saveOrder = async (items, totalAmount, paymentMethod, paymentId = null) => {
        try {
            const res = await api.post("/api/orders", {
                userId: user._id,
                items,
                totalAmount,
                paymentMethod,
                ...(paymentId && { paymentId }),
            });
            setOrders((prev) => [res.data.order, ...prev]);
            if (directBuyItem) {
                clearDirectBuy();
            } else {
                await clearCart();
            }
            alert("Payment Successful");
            navigate("/ordersuccess");
        } catch (err) {
            console.error("Save order failed:", err);
            alert("Payment done but order saving failed. Contact support.");
        }
    };

    // ROZERPAY
    const handleRazorpay = async (items, totalAmount) => {
        try {
            const orderRes = await api.post("/api/razorpay/create-order", {
                amount: totalAmount,
            });

            const { order } = orderRes.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Readora",
                description: "Book Order Payment",
                order_id: order.id,
                handler: async (response) => {
                    await saveOrder(items, totalAmount, "ONLINE", response.razorpay_payment_id);
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: { color: "#16a34a" },
            };

            const rzp = new window.Razorpay(options);

            rzp.on("payment.failed", (response) => {
                console.error("Razorpay error:", response.error);
                alert("Payment failed. Please try again.");
            });

            rzp.open();
        } catch (err) {
            console.error("Razorpay error:", err);
        }
    };

    // handle payment
    const handlePayment = async () => {
        const rawItems = directBuyItem
            ? [{ book: directBuyItem.book, qty: directBuyItem.qty || 1 }]
            : (cart.items || []);

        if (!user || rawItems.length === 0) return;

        try {
            const items = rawItems.map((item) => {
                const book = item.book || item;
                return {
                    bookId: book._id || book.id,
                    title: book.title,
                    price: book.price,
                    qty: item.qty || 1,
                    img: book.img
                };
            });

            const totalAmount = items.reduce(
                (total, item) => total + item.price * item.qty, 0
            );

            if (method === "ONLINE") {
                await handleRazorpay(items, totalAmount);
                return;
            }

            const orderData = {
                userId: user._id,
                items,
                paymentMethod: method,
                totalAmount,
            };

            const res = await api.post("/api/orders", orderData);

            setOrders((prev) => [res.data.order, ...prev]);
            if (directBuyItem) {
                clearDirectBuy();
            } else {
                await clearCart();
            }

            alert("Payment Successful");
            navigate("/ordersuccess");
        } catch (err) {
            console.error("Payment failed", err);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0f] px-4 py-12 transition-colors duration-300">
            <div className="max-w-md w-full bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-8">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-6">
                    Select Payment Method
                </h1>

                <div className="space-y-3 mb-6">
                    <label className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all duration-200 ${
                        method === "COD"
                            ? "bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500/50 text-indigo-900 dark:text-indigo-200 font-semibold shadow-sm"
                            : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}>
                        <input
                            type="radio"
                            checked={method === "COD"}
                            onChange={() => setMethod("COD")}
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                        />
                        <span className="text-sm sm:text-base">💵 Cash on Delivery</span>
                    </label>

                    <label className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all duration-200 ${
                        method === "ONLINE"
                            ? "bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500/50 text-indigo-900 dark:text-indigo-200 font-semibold shadow-sm"
                            : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}>
                        <input
                            type="radio"
                            checked={method === "ONLINE"}
                            onChange={() => setMethod("ONLINE")}
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                        />
                        <span className="text-sm sm:text-base">💳 Online Payment (Razorpay)</span>
                    </label>
                </div>

                <button
                    onClick={handlePayment}
                    className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-indigo-500/20 active:scale-[0.99] transition-all duration-200 min-h-[44px]"
                >
                    Pay & Confirm Order
                </button>
            </div>
        </div>
    );
}

export default Payment;


