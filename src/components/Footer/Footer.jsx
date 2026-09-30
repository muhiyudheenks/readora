import { useEffect, useState } from "react";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaLocationArrow,
    FaMobileAlt,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-slate-900 dark:bg-[#080910] text-slate-300 border-t border-slate-800/60 transition-colors duration-300">
            <div className="container mx-auto px-4 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 border-b border-slate-800/60">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/images/logo1.png" alt="Readora Logo" className="w-10 h-10 rounded-full shadow-md" />
                            <span className="text-xl font-serif font-bold text-white">Readora</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                            Readora is your trusted destination for discovering, reading, and owning books that inspire minds and shape ideas.
                        </p>
                        {/* Social */}
                        <div className="flex items-center gap-4 mt-6">
                            {[FaInstagram, FaFacebook, FaLinkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110">
                                    <Icon className="text-sm" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">Quick Links</h3>
                        <ul className="space-y-3">
                            {["Home", "All Category", "About Us", "Contact Us"].map((link, i) => (
                                <li key={i}>
                                    <a href="#" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">Contact</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <FaLocationArrow className="text-indigo-400 flex-shrink-0" />
                                <p className="text-sm text-slate-400">Thrissur, Kerala</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaMobileAlt className="text-indigo-400 flex-shrink-0" />
                                <p className="text-sm text-slate-400">+91 9809146613</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-6 text-center">
                    <p className="text-xs text-slate-600">© {new Date().getFullYear()} Readora. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;