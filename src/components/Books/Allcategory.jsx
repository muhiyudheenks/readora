import React, { useEffect } from 'react'
import { FaStar } from "react-icons/fa6";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../API/Axios';

function Allcategory() {
    const navigate = useNavigate();
    const [book, setBook] = useState([]);
    const [currentpage, setCurrentpage] = useState(1)
    const itemsperpage = 3;
    useEffect(() => {
        api.get(`/api/allcategory`)
            .then((res) => setBook(res.data))
            .catch((err) => console.error(err))
    }, []);

    const lastindex = currentpage * itemsperpage;
    const firstindex = lastindex - itemsperpage;
    const currentitems = book.slice(firstindex, lastindex);
    const totalpages = Math.ceil(book.length / itemsperpage)
    return (
        <div className='py-14 sm:py-16 bg-slate-50 dark:bg-[#0a0a0f] transition-colors duration-300'>
            <div className='container mx-auto px-4'>
                {/* Header */}
                <div className='text-center mb-12 max-w-2xl mx-auto'>
                    <h1 data-aos="fade-up" className='text-3xl sm:text-4xl font-serif font-extrabold text-gradient mb-4'>
                        All Categories
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="100" className='text-sm text-slate-500 dark:text-slate-400 leading-relaxed'>
                        Discover books that inspire, educate, and transport you to new worlds. Readora is your modern home for stories, knowledge, and imagination.
                    </p>
                </div>

                {/* Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 place-items-center'>
                    {currentitems.map((data) => (
                        <div key={data._id}
                            data-aos="fade-up"
                            data-aos-delay={data.aosDelay}
                            className='group bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 p-6 rounded-2xl w-full max-w-[320px] hover:-translate-y-2 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:shadow-xl dark:hover:shadow-indigo-900/20 transition-all duration-300 flex flex-col items-center text-center'
                        >
                            <div className="relative mb-5 overflow-visible">
                                <img src={data.img}
                                    className='h-[220px] w-[150px] object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-all duration-500'
                                    alt={data.type}
                                />
                            </div>

                            <div className="flex flex-col flex-grow w-full">
                                <h3 className='font-bold text-lg text-slate-900 dark:text-slate-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200'>{data.type}</h3>
                                <p className='text-sm text-slate-500 dark:text-slate-400 font-medium mb-2'>by {data.author}</p>
                                <p className='text-xs text-slate-400 dark:text-slate-500 mb-5 line-clamp-2 leading-relaxed'>{data.description}</p>

                                <button onClick={() => navigate(`/books/${encodeURIComponent(data.category)}`)}
                                    className="mt-auto border border-indigo-500/50 text-indigo-600 dark:text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-500 hover:text-white hover:border-transparent py-2.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 w-full touch-target"
                                >
                                    View Category
                                </button>
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
                            className={`w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200 ${
                                currentpage === index + 1
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

export default Allcategory;

