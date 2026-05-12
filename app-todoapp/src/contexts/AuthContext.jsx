import { useState, useEffect, createContext, useContext } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({});
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const result = await api.post("/login", { email, password });
        if (result && result.token) {
            localStorage.setItem("token", result.token);
            setUser({ email });
        } else {
            throw new Error(result?.error || "Erreur d'authentification");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, Loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}