import React, { useState } from 'react';
import bgImage from '../assets/login.jpg';
import { login } from "../services/authService.js";
import { register } from "../services/authService.js";
import {useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';
import {useAuth} from "../context/AuthContext.jsx";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // sau 'error', 'info', etc.
    const { login: loginToContext } = useAuth();

    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password) =>
        password.length >= 8 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /\d/.test(password) &&
        /[@$!%*?&]/.test(password);

    const validateUserName = (userName) =>
        userName.length >= 3 && userName.length <= 50;

    const validateConfirmPassword = () => password === confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlertMessage('');

        try {
            if (isLogin) {
                const data = await login(email, password);
                console.log(data);
                loginToContext(data.token, data.user);
                setAlertSeverity('success');
                setAlertMessage('Logged in successfully!');

                setTimeout(() => {
                    if (data.user.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/shop');
                    }
                }, 1500);
            } else {
                const data = await register(userName, email, password);
                loginToContext(data.token, data.user);

                setAlertSeverity('success');
                setAlertMessage('Registered successfully!');
                setTimeout(() => navigate('/shop'), 1500);
            }
        } catch (error) {
            setAlertSeverity('error');
            setAlertMessage(error.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex">

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 h-screen mt-10">
                <div className="w-full max-w-md">
                    {alertMessage && (
                        <Alert variant="filled" severity={alertSeverity} onClose={() => setAlertMessage('')}>
                            {alertMessage}
                        </Alert>
                    )}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                                style={{ backgroundColor: '#1F3134' }}
                            >
                                <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} text-white fa-lg`} />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: '#1F3134' }}>
                                {isLogin ? 'Welcome Back!' : 'Create Account'}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                {isLogin ? 'Please sign in to continue' : 'Get started with your account'}
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">User Name</label>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 bg-[#1F3134] text-white placeholder-gray-400"
                                        placeholder="userLuy"
                                    />
                                    {userName && !validateUserName(userName) && (
                                        <p className="mt-2 text-sm text-red-600">
                                            User name must be between 3 and 50 characters
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 bg-[#1F3134] text-white placeholder-gray-400"
                                    placeholder="you@example.com"
                                />
                                {email && !validateEmail(email) && (
                                    <p className="mt-2 text-sm text-red-600">Please enter a valid email address</p>
                                )}
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 bg-[#1F3134] text-white placeholder-gray-400"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white bg-transparent p-1 rounded-full transition duration-200 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none border-none"
                                        tabIndex={-1}
                                    >
                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                                    </button>
                                </div>
                                {password && !validatePassword(password) && (
                                    <p className="mt-2 text-sm text-red-600">
                                        Password must be at least 8 characters, include uppercase, lowercase, number and special character
                                    </p>
                                )}
                            </div>

                            {!isLogin && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 bg-[#1F3134] text-white placeholder-gray-400"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white bg-transparent p-1 rounded-full transition duration-200 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none border-none"
                                            tabIndex={-1}
                                        >
                                            <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                                        </button>
                                    </div>
                                    {confirmPassword && !validateConfirmPassword() && (
                                        <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={
                                    loading ||
                                    (email && !validateEmail(email)) ||
                                    (password && !validatePassword(password)) ||
                                    (!isLogin && confirmPassword && !validateConfirmPassword())
                                }
                                className="w-full py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    backgroundColor: '#EE6C4D',
                                    color: 'white',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {loading ? (
                                    <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                                ) : (
                                    isLogin ? 'Sign In' : 'Create Account'
                                )}
                            </button>

                            <p className="mt-6 text-center text-gray-600">
                                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="ml-1 font-semibold focus:outline-none"
                                    style={{
                                        color: '#EE6C4D',
                                        backgroundColor: 'transparent',
                                        fontSize: '1.1rem',
                                        border: 'none',
                                        outline: 'none',
                                        transition: 'transform 0.2s',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    {isLogin ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div
                className="hidden lg:block lg:w-1/2 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div
                    style={{ backgroundColor: 'rgba(55,52,52,0.8)' }}
                    className="h-full flex items-center justify-center"
                >
                    <div className="text-center text-white px-12" >
                        <h2 className="text-4xl font-bold mb-6" style={{ color: "#EE6C4D" }}>VYLU MODE</h2>
                        <p className="text-xl" style={{ color: "white" }}>
                            Try on the latest styles virtually and discover your perfect look. Experience fashion in a new way—anytime, anywhere, with VYLU MODE.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
