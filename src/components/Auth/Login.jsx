import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function Login() {
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [hide, setHide] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate()
    const hidePassword = () => {
        setHide(prev => !prev);
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            console.log('validating...');

            setIsSubmitting(true);
            setError("");

            const result = await login(values.email, values.password);


            if (!result.success) {
                console.log('passed!');

                setError(result.error);
                console.log(error);

                setIsSubmitting(false);
                return;
            }
            localStorage.setItem('token', result.token)
            alert("Login successful");
            setIsSubmitting(false);
            navigate('/')

        }


    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 dark:from-[#0a0a0f] dark:via-[#0f101b] dark:to-[#0a0a0f] px-4 py-12 transition-colors duration-300">
            {/* Background ambient glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-sm relative z-10">
                {/* Card */}
                <div className="bg-white dark:bg-[#12131c] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800/80 p-8">
                    {/* Logo / Title */}
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                            <img src="/images/logo1.png" alt="Readora" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">
                            Welcome back
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Sign in to your Readora account
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        {error && <div className="border border-rose-300 dark:border-rose-700 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-sm text-center">
                            {error}
                        </div>}
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 text-sm min-h-[44px]"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                                Password
                            </label>
                            <input
                                type={hide ? "password" : "text"}
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 text-sm pr-11 min-h-[44px]"
                            />
                            <span
                                onClick={hidePassword}
                                className="absolute right-3 top-[38px] cursor-pointer text-slate-400 hover:text-indigo-500 transition-colors"
                            >
                                {hide ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                        {/* Forgot password */}
                        <div className="flex justify-end -mt-2">
                            <Link
                                to="/forgot-password"
                                className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 min-h-[44px] disabled:opacity-60"
                        >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
