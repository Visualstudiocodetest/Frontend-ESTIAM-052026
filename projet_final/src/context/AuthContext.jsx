import { useState, useEffect, createContext, useContext } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

function decodeToken(token) {
    try {
        const payload = token.split('.')[1];
        const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
        const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
        return JSON.parse(atob(padded));
    } catch {
        return null;
    }
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = decodeToken(token);
            if (decoded?.email) {
                setUser({ email: decoded.email });
            } else {
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const result = await api.post("/login", { email, password });
        if (result && result.token) {
            localStorage.setItem("token", result.token);
            const decoded = decodeToken(result.token);
            setUser({ email: decoded?.email || email });
        } else {
            throw new Error(result?.error || "Erreur d'authentification");
        }
    };

    const register = async (email, password) => {
        return api.post("/register", { email, password });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, Loading: loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}