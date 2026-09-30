// import React, { useState } from 'react'
// import { IoPersonCircle } from 'react-icons/io5'
// import { useAuth } from '../Context/AuthContext';
// import { FaEdit } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// function Profile() {
//     const navigate = useNavigate();
//     const [userdata, setUserdata] = useState([]);
//     const { user, loadingAuth, logout } = useAuth();
//     console.log(user, "userpro");


//     if (loadingAuth) return null;
//     if (!user) return;
//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };
//     const handleOrderList = () => {
//         navigate('/orderlist');
//     }


//     return (
//         <div className='flex justify-center w-full bg-black gap-10 mt-10'>
//             <div className="min-h-screen  w-[800px] flex  items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

//                 <div key={user.id} className="flex flex-col w-[600px] max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 gap-2">

//                     <div className="text-center justify-center mb-6   bg-primary  w-full p-10 rounded-md">
//                         <div className=' flex justify-center text-center text-6xl '>
//                             <IoPersonCircle />
//                         </div>
//                         <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
//                             {user.name}
//                         </h1>
//                     </div>
//                     <div className='flex justify-between'>
//                         <h1>Personal Information</h1>
//                         <button onClick={() => navigate("/addreslist")}
//                             className="flex items-center gap-2">
//                             <span><FaEdit /></span>
//                             Edit Profile

//                         </button>
//                     </div>


//                     <div className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         <h1 className='text-1xl font-bold'>
//                             Full Name
//                         </h1>
//                         <p>{user.name}</p>
//                     </div>
//                     <div className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         <h1 className='text-1xl font-bold'>
//                             Email
//                         </h1>
//                         <p>{user.email}</p>

//                     </div>
//                     <div className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         <h1 className='text-1xl font-bold'>
//                             Phone Number
//                         </h1>
//                         <p>{user?.phone || "Not added"}</p>
//                     </div>
//                     <div className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         <h1 className='text-1xl font-bold'>
//                             Address
//                         </h1>
//                         <p>{`${user.address} state: ${user.state} pincode: ${user.pincode}` || " Not added"}</p>

//                     </div>

//                 </div>

//                 <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 gap-4">
//                     Account Management
//                     <button onClick={() => navigate("/password")}
//                         className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         Change Password</button>
//                     <button onClick={() => navigate("/addreslist")}
//                         className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         Address Book</button>
//                     <button
//                         onClick={handleOrderList} className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         My Order</button>
//                     <button
//                         onClick={handleLogout} className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         Log Out</button>
//                 </div>
//             </div>
//         </div>

//     )
// }


// export default Profile



import React, { useEffect, useState } from 'react'
import { IoPersonCircle } from 'react-icons/io5'
import { useAuth } from '../Context/AuthContext';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../API/Axios';

function Profile() {
    const navigate = useNavigate();
    const { user, loadingAuth, logout } = useAuth();
    const [address, setAddress] = useState(null);

    useEffect(() => {
        const fetchAddress = async () => {

            try {

                const res = await api.get("/api/users/address");

                setAddress(res.data.userAddress?.address)
                console.log('pfofileusers', res.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchAddress();

    }, []);

    if (loadingAuth) return <p>Loading...</p>;

    if (!user) return <p>No User</p>;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleOrderList = () => {
        navigate('/orderlist');
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] py-10 sm:py-14 px-4 transition-colors duration-300">
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Main Profile Card */}
                <div className="bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden p-6 sm:p-8">

                    {/* Header Banner */}
                    <div className="text-center bg-gradient-to-r from-indigo-600 to-cyan-500 text-white p-8 rounded-2xl mb-8 shadow-md">
                        <div className="flex justify-center text-6xl mb-3 opacity-90">
                            <IoPersonCircle />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-serif font-bold">
                            {user.name}
                        </h1>
                        <p className="text-xs text-indigo-100 mt-1 opacity-80">{user.email}</p>
                    </div>

                    {/* Personal Info Header */}
                    <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100">
                            Personal Information
                        </h2>

                        <button
                            onClick={() => navigate("/addreslist")}
                            className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium transition-colors min-h-[44px] px-3 py-1 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                        >
                            <FaEdit className="text-xs" />
                            Edit Profile
                        </button>
                    </div>

                    {/* Information Fields */}
                    <div className="space-y-4">
                        <div className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-5 py-3.5">
                            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">Full Name</h3>
                            <p className="text-slate-900 dark:text-slate-100 text-sm sm:text-base font-medium">{user.name}</p>
                        </div>

                        <div className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-5 py-3.5">
                            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">Email Address</h3>
                            <p className="text-slate-900 dark:text-slate-100 text-sm sm:text-base font-medium">{user.email}</p>
                        </div>

                        <div className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-5 py-3.5">
                            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">Phone Number</h3>
                            <p className="text-slate-900 dark:text-slate-100 text-sm sm:text-base font-medium">{user.phone || "Not added"}</p>
                        </div>

                        <div className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-5 py-3.5">
                            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">Address</h3>
                            <p className="text-slate-900 dark:text-slate-100 text-sm sm:text-base font-medium">
                                {address?.address
                                    ? `${address.address}, ${address.city}, ${address.district}, ${address.state} - ${address.pincode}`
                                    : "Not added"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Account Management Card */}
                <div className="bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm p-6 sm:p-8">
                    <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                        Account Management
                    </h2>

                    <div className="space-y-3">
                        <button
                            onClick={() => navigate("/password")}
                            className="w-full text-left px-5 py-3.5 bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 min-h-[44px] flex items-center justify-between"
                        >
                            <span>🔐 Change Password</span>
                            <span className="text-slate-400 text-xs">→</span>
                        </button>

                        <button
                            onClick={() => navigate("/addreslist")}
                            className="w-full text-left px-5 py-3.5 bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 min-h-[44px] flex items-center justify-between"
                        >
                            <span>📍 Address Book</span>
                            <span className="text-slate-400 text-xs">→</span>
                        </button>

                        <button
                            onClick={handleOrderList}
                            className="w-full text-left px-5 py-3.5 bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 min-h-[44px] flex items-center justify-between"
                        >
                            <span>📦 My Orders</span>
                            <span className="text-slate-400 text-xs">→</span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-5 py-3.5 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 rounded-2xl text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-100/50 dark:hover:bg-rose-950/40 transition-all duration-200 min-h-[44px] flex items-center justify-between mt-4"
                        >
                            <span>🚪 Log Out</span>
                            <span className="text-rose-400 text-xs">→</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile;