import React from "react";


const Subscribe = () => {
    return (
        <div
            data-aos="zoom-in"
            className="py-14 sm:py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 relative overflow-hidden"
        >
            {/* Subtle decorative orbs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                        Get Notified About New Books
                    </h2>
                    <p className="text-white/80 text-sm mb-6">Stay ahead of the curve — be the first to know.</p>
                    <div
                        data-aos="fade-up"
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        <input
                            type="text"
                            placeholder="Enter your email address"
                            className="flex-1 py-3 px-5 rounded-xl text-sm text-slate-900 dark:text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-white/60 shadow-md min-h-[44px]"
                        />
                        <button className="bg-white/20 hover:bg-white/30 border border-white/40 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-sm hover:scale-[1.02] active:scale-[0.98] touch-target whitespace-nowrap shadow-md">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;