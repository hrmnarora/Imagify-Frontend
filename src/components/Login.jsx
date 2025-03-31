import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Login = () => {
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

    const [state, setState] = useState('Signup');
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    // Handles input changes dynamically
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault();

        console.log(`Submitting ${state} Data:`, formData);

        try {
            const endpoint = state === 'Login' ? 'login' : 'register';
            const { data } = await axios.post(`${backendUrl}/api/users/${endpoint}`, formData);

            if (data.success) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('token', data.token);
                setShowLogin(false);
                toast.success(`${state} successful!`);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error(`${state} Error:`, err.response?.data || err.message);
            toast.error(err?.response?.data?.message || "Something went wrong. Please try again.");
        }
    }, [state, formData, backendUrl, setToken, setUser, setShowLogin]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        <div className="fixed z-50 inset-0 backdrop-blur-md bg-black/50 flex justify-center items-center">
            <form onSubmit={onSubmitHandler} className="relative bg-white p-10 rounded-xl text-gray-700 shadow-lg w-96">
                <h1 className="text-center text-2xl font-medium">{state}</h1>
                <p className="text-center text-sm mb-4">
                    {state === 'Login' ? 'Welcome back! Please sign in to continue' : 'Create an account to get started'}
                </p>

                {state !== 'Login' && (
                    <div className="flex border border-gray-300 px-6 py-2 items-center gap-2 rounded-full mt-3">
                        <img width={30} src={assets.profile_icon} alt="Profile" />
                        <input 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            className="outline-none text-base w-full" 
                            type="text" 
                            placeholder="Full Name" 
                            required 
                        />
                    </div>
                )}

                <div className="flex border border-gray-300 px-6 py-2 items-center gap-2 rounded-full mt-4">
                    <img width={20} src={assets.email_icon} alt="Email" />
                    <input 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        className="outline-none text-base w-full" 
                        type="email" 
                        placeholder="Email ID" 
                        required 
                    />
                </div>

                <div className="flex border border-gray-300 px-6 py-2 items-center gap-2 rounded-full mt-4">
                    <img width={15} src={assets.lock_icon} alt="Lock" />
                    <input 
                        name="password" 
                        value={formData.password} 
                        onChange={handleInputChange} 
                        className="outline-none text-base w-full" 
                        type="password" 
                        placeholder="Password" 
                        required 
                    />
                </div>

                {state === 'Login' && (
                    <p className="text-sm text-blue-600 mt-4 cursor-pointer hover:underline">
                        Forgot password?
                    </p>
                )}

                <button 
                    type="submit" 
                    className="bg-blue-600 w-full text-white py-2 mt-4 rounded-full hover:bg-blue-700 active:scale-95 transition"
                >
                    {state === 'Login' ? 'Login' : 'Create Account'}
                </button>

                <p className="mt-5 text-center text-sm">
                    {state === 'Login' ? "Don't have an account?" : "Already have an account?"} 
                    <span 
                        className="text-blue-600 cursor-pointer hover:underline" 
                        onClick={() => setState(state === 'Login' ? 'Signup' : 'Login')}
                    >
                        {state === 'Login' ? ' Signup' : ' Login'}
                    </span>
                </p>

                <img 
                    onClick={() => setShowLogin(false)} 
                    className="absolute cursor-pointer top-5 right-5 w-5 hover:scale-110 transition" 
                    src={assets.cross_icon} 
                    alt="Close" 
                />
            </form>
        </div>
    );
};

export default Login;
