import React from 'react'
import { GrSecure } from "react-icons/gr";
import { FaThLarge } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { IoPricetags } from "react-icons/io5";
import { FaShippingFast } from "react-icons/fa";
function Banner() {
    const features = [
        { icon: <FaThLarge />, label: "Millions of books" },
        { icon: <VscWorkspaceTrusted />, label: "Genuine books" },
        { icon: <IoPricetags />, label: "Great pricing" },
        { icon: <FaShippingFast />, label: "Faster delivery" },
        { icon: <GrSecure />, label: "Secure Payment" },
    ];

    return (
        <div className='py-16 sm:py-20 bg-white dark:bg-[#0b0c10] transition-colors duration-300'>
            <div className='container mx-auto px-4'>
                <div className="flex flex-col sm:flex-row items-center gap-10 sm:gap-16 lg:gap-24">
                    {/* Image + promo text */}
                    <div className="flex-shrink-0 flex flex-col items-center sm:items-start w-full sm:w-auto">
                        <img
                            src="/banner/banner.png"
                            alt="Banner"
                            className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-cover rounded-2xl shadow-xl mb-6"
                        />
                        <h2 data-aos="fade-up" className='text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-2 text-center sm:text-left'>
                            🔥 Up to 50% Off on Bestsellers
                        </h2>
                        <p data-aos="fade-up" className='text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-center sm:text-left'>
                            Upgrade your library today and save big!
                        </p>
                    </div>
                    {/* Features */}
                    <div className='flex flex-col gap-4 w-full'>
                        {features.map((f, i) => (
                            <div key={i} data-aos="fade-up" className='flex items-center gap-4 p-4 bg-slate-50 dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:shadow-md transition-all duration-200 group'>
                                <div className='text-xl p-3 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-200'>
                                    {f.icon}
                                </div>
                                <p className='font-semibold text-slate-700 dark:text-slate-200 text-sm sm:text-base'>{f.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
