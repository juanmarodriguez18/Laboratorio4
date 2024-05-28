import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, logout } from '../servicios/authService';

interface Usuario {
    nombreUsuario: string;
    clave: string;
    id: number;
    rol: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    usuario: Usuario | null;
    login: (nombreUsuario: string, clave: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const usuarioLocalStorage = localStorage.getItem('usuario');
            if (usuarioLocalStorage) {
                setUsuario(JSON.parse(usuarioLocalStorage));
            }
        }
    }, []);

    const handleLogin = async (nombreUsuario: string, clave: string) => {
        try {
            const usuarioLogueado = await login(nombreUsuario, clave);
            setIsLoggedIn(true);
            setUsuario(usuarioLogueado);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw new Error('Usuario y/o Clave incorrectos, vuelva a intentar');
        }
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        setUsuario(null);
    };

    const contextValue = {
        isLoggedIn,
        usuario,
        login: handleLogin,
        logout: handleLogout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
