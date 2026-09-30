// import React, { useState } from 'react'
// import { useAuth } from '../Context/AuthContext';
// import api from '../../API/Axios';

// function Password() {
//     const [newPassword, setNewPassword] = useState("");
//     const [oldPassword, setOldPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const { user } = useAuth();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (newPassword !== confirmPassword) {
//             alert("New Password and Confirm Password do not match");
//             return;
//         }
//         if (confirmPassword.length < 6) {
//             alert("Password must be at least 6 characters long");
//             return;
//         }


//         await api.patch(`/users/reset-password/${user.id}`, {
//             password: newPassword, cpassword: confirmPassword
//         }).catch((error) => { });
//         alert("Password changed successfully");
//         setOldPassword("");
//         setNewPassword("");
//         setConfirmPassword("");
//     }
//     return (
//         <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
//             <h2 className="text-xl font-bold mb-4">Change Password</h2>

//             <input
//                 type="password"
//                 placeholder="Old Password"
//                 className="w-full border p-2 mb-3"
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//             />

//             <input
//                 type="password"
//                 placeholder="New Password"
//                 className="w-full border p-2 mb-3"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//             />

//             <input
//                 type="password"
//                 placeholder="Confirm New Password"
//                 className="w-full border p-2 mb-4"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//             />

//             <button
//                 onClick={handleSubmit}
//                 className="w-full bg-blue-600 text-white py-2 rounded"
//             >
//                 Update Password
//             </button>
//         </div>
//     );
// }

// export default Password


import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import api from '../../API/Axios';

function Password() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {

            await api.patch(`/users/reset-password/${user._id}`, {
                oldPassword,
                password: newPassword,
                cpassword: confirmPassword
            });

            alert("Password changed successfully");

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {
            console.log(error.response, "err");

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0f] px-4 py-12 transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl space-y-5">
                <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 text-center mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                    Change Password
                </h2>

                <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">Old Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">New Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-indigo-500/20 active:scale-[0.99] transition-all duration-200 min-h-[44px] mt-4"
                >
                    Update Password
                </button>
            </div>
        </div>
    );
}

export default Password
