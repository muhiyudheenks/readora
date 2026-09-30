import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'
import api from '../../API/Axios';

function Hero() {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };
    const [hero, setHero] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        api.get("/api/hero")
            .then((res) => setHero(res.data))
            .catch((err) => console.error(err));
    }, [])

    return (
        <div className='relative overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-[650px] bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100 dark:from-[#0a0a0f] dark:via-[#0f101b] dark:to-[#141526] flex justify-center items-center transition-colors duration-300 py-8 sm:py-12'>
            {/* Glowing background orbs for subtle premium feel */}
            <div className='absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none'></div>
            <div className='absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none'></div>

            {/* hero section */}
            <div className='container mx-auto px-4 z-10'>
                <Slider {...settings}>
                    {Array.isArray(hero) && hero.map((item) => (
                        <div key={item.id}>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-4'>
                                {/* content section */}
                                <div className='flex flex-col justify-center gap-5 sm:gap-6 text-center lg:text-left order-2 lg:order-1 relative z-10 px-2 sm:px-0'>
                                    <span className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 w-fit">
                                        ✨ Featured Release
                                    </span>
                                    <h1
                                        data-aos="zoom-out"
                                        data-aos-once="true"
                                        data-aos-duration="500"
                                        className='text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 dark:text-slate-100 leading-tight tracking-tight'
                                    >
                                        <span className="text-gradient block">{item.title}</span>
                                    </h1>
                                    <p
                                        data-aos="fade-up"
                                        data-aos-once="true"
                                        data-aos-delay="100"
                                        className='text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed'
                                    >
                                        {item.description}
                                    </p>
                                    <div data-aos="fade-up" data-aos-once="true" data-aos-delay="300" className='mt-2 flex justify-center lg:justify-start'>
                                        {user ? (
                                            <div className='inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white py-3 px-7 rounded-full font-bold text-base sm:text-lg shadow-lg shadow-indigo-500/25'>
                                                <span>Welcome back, {user.name}!</span>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => navigate('/signup')}
                                                className='bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 text-sm sm:text-base touch-target'
                                            >
                                                Explore Collection
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* image section */}
                                <div className='order-1 lg:order-2 flex justify-center'>
                                    <div data-aos="zoom-in" data-aos-once="true" className='relative z-10 p-4 sm:p-6 animate-[float_6s_ease-in-out_infinite]'>
                                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 rounded-2xl blur-xl transform scale-95"></div>
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            onError={(e) => (e.target.src = "/hero/image1.webp")}
                                            className='w-[180px] h-[270px] sm:w-[240px] sm:h-[360px] lg:w-[280px] lg:h-[420px] object-cover rounded-2xl mx-auto shadow-2xl border border-white/20 dark:border-slate-800/80 transition-all duration-500 hover:scale-105'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-16px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>
        </div>
    );
};

export default Hero;