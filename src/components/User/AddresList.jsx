// import React, { useState } from 'react'
// import { useAuth } from '../Context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import api from '../../API/Axios';

// function AddresList() {
//     const { updateProfile, user } = useAuth();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         name: user?.name || "",
//         lastName: user?.lastName || "",
//         phone: user?.phone || "",
//         address: user?.address || "",
//         city: user?.city || "",
//         state: user?.state || "",
//         pincode: user?.pincode || "",
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             updateProfile(formData);
//             // await api.post("/api/address", { ...formData, userId: user._id });

//             navigate("/profile");
//         } catch (error) {
//             console.log(error);

//         }

//     };

//     return (
//         <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
//             <form onSubmit={handleSubmit}
//                 className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-5">

//                 <h2 className="text-2xl font-bold text-center">Edit Address</h2>

//                 <input name="name" value={formData.name}
//                     onChange={handleChange} placeholder="First Name" className="input border" />

//                 <input name="lastName" value={formData.lastName}
//                     onChange={handleChange} placeholder="Last Name" className="input border" />

//                 <input name="phone" value={formData.phone}
//                     onChange={handleChange} placeholder="Phone" className="input border" />

//                 <textarea name="address" value={formData.address}
//                     onChange={handleChange} placeholder="Complete Address"
//                     className="input border w-full" />

//                 <div className="grid grid-cols-3 gap-3">
//                     <input name="state" value={formData.state}
//                         onChange={handleChange} placeholder="State" className="input border" />
//                     <input name="city" value={formData.city}
//                         onChange={handleChange} placeholder="City" className="input border" />
//                     <input name="pincode" value={formData.pincode}
//                         onChange={handleChange} placeholder="Pincode" className="input border" />
//                 </div>

//                 <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
//                     Save Address
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default AddresList;


import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../API/Axios';

function AddresList() {
    const { updateProfile, user, setUser } = useAuth();
    const navigate = useNavigate();
    console.log('check', user);

    const [formData, setFormData] = useState({
        address: "",
        city: "",
        hometown: "",
        district: "",
        state: "",
        post: "",
        pincode: "",
    });

    useEffect(() => {
        if (user.address) {

            setFormData({
                address: user.address.address || "",
                city: user.address.city || "",
                hometown: user.address.hometown || "",
                district: user.address.district || "",
                state: user.address.state || "",
                post: user.address.post || "",
                pincode: user.address.pincode || "",
            });
        }
    }, [user]);
    console.log('formdata', formData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.patch("/api/users/address", { ...formData });
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            const redirectTarget = localStorage.getItem("readora_redirect_after_address");
            if (redirectTarget) {
                localStorage.removeItem("readora_redirect_after_address");
                navigate(redirectTarget);
            } else {
                navigate("/profile");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0f] px-4 py-12 transition-colors duration-300">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl space-y-5"
            >
                <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 text-center mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                    Edit Delivery Address
                </h2>

                <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">Street Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Complete Street Address"
                        rows="3"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">Post Office</label>
                        <input
                            name="post"
                            value={formData.post}
                            onChange={handleChange}
                            placeholder="Post Office"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">Pincode</label>
                        <input
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            placeholder="Pincode"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">Hometown</label>
                        <input
                            name="hometown"
                            value={formData.hometown}
                            onChange={handleChange}
                            placeholder="Hometown"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">City</label>
                        <input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">District</label>
                        <input
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            placeholder="District"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">State</label>
                        <input
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-indigo-500/20 active:scale-[0.99] transition-all duration-200 min-h-[44px] mt-4"
                >
                    Save Address
                </button>
            </form>
        </div>
    );
}

export default AddresList;
