import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import { Validation } from "./Validation";
import { useAuth } from "../Context/AuthContext";

const initialValues = {
    id: uuid(),
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    role: "user"
};
const Signup = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
        initialValues,
        validationSchema: Validation,
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true);
            setError('');

            const result = await register({
                id: uuid(),
                name: values.name,
                email: values.email,
                phone: values.phone,
                password: values.password,
                cpassword: values.cpassword
            });

            if (result.success) {
                alert("Registration successful");
                resetForm();
                navigate("/");
            } else {
                setError(result.error);
            }

            setIsSubmitting(false);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 dark:from-[#0a0a0f] dark:via-[#0f101b] dark:to-[#0a0a0f] px-4 py-12 transition-colors duration-300">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-sm relative z-10">
                <div className="bg-white dark:bg-[#12131c] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800/80 p-8">
                    {/* Title */}
                    <div className="text-center mb-7">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                            <img src="/images/logo1.png" alt="Readora" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">
                            Create Account
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Join Readora and start reading
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                            { label: "Full Name", name: "name", type: "text", placeholder: "Your name" },
                            { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
                            { label: "Phone Number", name: "phone", type: "text", placeholder: "Your phone number" },
                            { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
                            { label: "Confirm Password", name: "cpassword", type: "password", placeholder: "••••••••" },
                        ].map(({ label, name, type, placeholder }) => (
                            <div key={name}>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    placeholder={placeholder}
                                    value={values[name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 text-sm min-h-[44px]"
                                />
                                {errors[name] && touched[name] && (
                                    <p className="text-rose-500 dark:text-rose-400 text-xs mt-1">{errors[name]}</p>
                                )}
                            </div>
                        ))}

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 min-h-[44px] disabled:opacity-60 mt-2"
                        >
                            {isSubmitting ? "Creating account..." : "Create Account"}
                        </button>

                        {error && (
                            <p className="text-rose-500 dark:text-rose-400 text-sm text-center">{error}</p>
                        )}
                    </form>

                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
