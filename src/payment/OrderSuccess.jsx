import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0f] px-4 transition-colors duration-300">
      <div className="text-center bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 p-8 sm:p-12 rounded-3xl shadow-xl max-w-md w-full">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          ✅
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100">
          Order Placed Successfully!
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm">
          Thank you for shopping with us. Your books will be on their way soon!
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all duration-200 min-h-[44px] flex items-center justify-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
