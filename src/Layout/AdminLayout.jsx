import { FaBox, FaEnvelope, FaShoppingCart, FaSignOutAlt, FaTachometerAlt, FaUsers } from "react-icons/fa"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../components/Context/AuthContext"

const AdminLayout = () => {
    const navigate = useNavigate()
    const { setUser } = useAuth()

    // const handleLogout = () => {
    //     localStorage.removeItem("token")
    //     localStorage.removeItem("user");

    //     setUser(null)
    //     navigate("/admin", { replace: true })
    // }
    const handleLogout = () => {
        localStorage.clear();

        setUser(null);

        navigate("/admin", { replace: true });

        window.location.reload();
    }
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-[#0a0a0f] transition-colors duration-300">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-900 dark:bg-[#080910] text-slate-300 flex flex-col border-r border-slate-800/60 z-50 shadow-xl">
                <div className="p-6 text-xl font-serif font-bold text-white tracking-wide border-b border-slate-800/60 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"></span>
                    Admin Panel
                </div>

                <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                    <NavLink
                        to="/admin/dashboard"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-sm"
                                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                            }`
                        }
                    >
                        <FaTachometerAlt className="text-base" /> Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-sm"
                                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                            }`
                        }
                    >
                        <FaUsers className="text-base" /> Users
                    </NavLink>

                    <NavLink
                        to="/admin/adminbooks"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-sm"
                                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                            }`
                        }
                    >
                        <FaBox className="text-base" /> Books
                    </NavLink>

                    <NavLink
                        to="/admin/adminorders"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-sm"
                                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                            }`
                        }
                    >
                        <FaShoppingCart className="text-base" /> Orders
                    </NavLink>

                    <NavLink
                        to="/admin/messages"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-sm"
                                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                            }`
                        }
                    >
                        <FaEnvelope className="text-base" /> Messages
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-slate-800/60">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-all duration-200 min-h-[44px]"
                    >
                        <FaSignOutAlt className="text-base" /> Logout
                    </button>
                </div>
            </aside>

            {/* Content */}
            <main className="ml-64 w-full min-h-screen overflow-y-auto bg-slate-50 dark:bg-[#0a0a0f] p-6 sm:p-8 transition-colors duration-300 text-slate-900 dark:text-slate-100">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout
