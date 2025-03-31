import { createContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [showLogin, setShowLogin] = useState(false);
    const [credit, setCredit] = useState(0);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const isGenerating = useRef(false);

    /** ✅ Fetch user credits safely */
    const loadCreditsData = async () => {
        if (!token) return;

        try {
            const { data } = await axios.get(`${backendUrl}/api/users/credits`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.success && typeof data.creditBalance !== "undefined") {
                setCredit(data.creditBalance);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    /** ✅ Generate image and handle credits properly */
    const generateImage = async (prompt) => {
        if (credit === 0) {
            toast.error("You don't have enough credits to generate an image.");
            navigate('/buy');
            return;
        }

        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const userId = decodedToken.id;

            const { data } = await axios.post(
                `${backendUrl}/api/image/generate-image`,
                { userId, prompt },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );

            if (data.success) {
                loadCreditsData();
                return data.resultImage;
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            if (error.response?.status === 403) {
                toast.error("You are not allowed to perform this action.");
                navigate('/buy');
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    /** ✅ Login: Save user & token + Redirect to `/` */
    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", authToken);
        navigate("/"); // ✅ Redirect to home after login
    };

    /** ✅ Logout: Clear everything + Redirect to `/` */
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/"); // ✅ Redirect to home after logout
    };

    /** ✅ Load user & credits when token exists */
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken) {
            setToken(savedToken);
        }
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        if (savedToken) {
            loadCreditsData();
        }
    }, []);

    return (
        <AppContext.Provider value={{ 
            user, 
            setUser, 
            showLogin, 
            setShowLogin, 
            backendUrl, 
            token, 
            setToken, 
            loadCreditsData, 
            logout, 
            login, 
            credit, 
            generateImage 
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
