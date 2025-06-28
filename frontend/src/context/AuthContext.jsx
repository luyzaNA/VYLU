import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true);

    const isTokenExpired = (exp) => {
        return !exp || Date.now() > exp;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("token_expiry");
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const expiry = parseInt(localStorage.getItem("token_expiry"), 10);

        if (token && storedUser) {
            if (isTokenExpired(expiry)) {
                logout();
                setLoading(false);
            } else {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser({ token, ...parsedUser });

                    const remaining = expiry - Date.now();
                    const timeoutId = setTimeout(logout, remaining);

                    setLoading(false);
                    return () => clearTimeout(timeoutId);
                } catch (error) {
                    console.error("Failed to parse stored user:", error);
                    logout();
                    setLoading(false);
                }
            }
        } else {
            setUser(null);
            setLoading(false);
        }
}, []);

    const login = (token, userInfo, expiresIn = 3600 * 1000) => {
        const expiryTime = Date.now() + expiresIn;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userInfo));
        localStorage.setItem("token_expiry", expiryTime.toString());

        setUser({ token, ...userInfo });

        // Auto logout după expiresIn ms
        setTimeout(logout, expiresIn);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
