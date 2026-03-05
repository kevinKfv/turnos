import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

export interface User {
    id: number;
    nombre: string;
    email: string;
    role: 'ADMIN' | 'PROFESIONAL' | 'CLIENTE';
    telefono?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    loginContext: (token: string, userData: User) => void;
    logoutContext: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            try {
                const decoded: any = jwtDecode(storedToken);
                if (decoded.exp * 1000 < Date.now()) {
                    logoutContext(); // Token expirado
                } else {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                logoutContext();
            }
        }
        setLoading(false);
    }, []);

    const loginContext = (newToken: string, userData: User) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(newToken);
        setUser(userData);
    };

    const logoutContext = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, loginContext, logoutContext }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
