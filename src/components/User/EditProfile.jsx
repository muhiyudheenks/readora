import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [phone, setPhone] = useState(user?.phone || "");

    const handleSubmit = (e) => {
        e.preventDefault();

        updateProfile({
            name,
            phone,
        });

        navigate("/profile");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0f] px-4 py-12 transition-colors duration-300">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl space-y-5"
            >
                <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 text-center mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                    Edit Profile
                </h2>

                <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">Full Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        required
                    />
                </div>

                <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">Phone Number</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-indigo-500/20 active:scale-[0.99] transition-all duration-200 min-h-[44px] mt-4"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditProfile;
