/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosError } from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IOrganizationUser, IUser } from '../types/backend';
import { useBackendControllerContext } from './BackendControllerContext';

interface AuthContextType {
    user: IUser | null;
    organizationUsers: IOrganizationUser[] | null;
    token: string | null;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
    loadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { axiosClient } = useBackendControllerContext();
    const [user, setUser] = useState<IUser | null>(null);
    const [organizationUsers, setOrganizationUsers] = useState<IOrganizationUser[] | null>(null);

    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true); // isLoading to track authentication loading status
    const navigate = useNavigate();
    const { userController, organizationUserController } = useBackendControllerContext();

    const login = (token: string) => {
        localStorage.setItem('token', token);
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setToken(token);
        setIsLoading(false); // Authentication completed after login
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axiosClient.defaults.headers.common['Authorization'];
        setUser(null);
        setToken(null);
        setIsLoading(false);
        navigate('/login');
    };

    // Function to load user data if token is available
    const loadUser = async () => {
        if (token) {
            try {
                setIsLoading(true); // Start loading
                axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const userData = await userController.me();

                const OrganizationUsers = await organizationUserController.getPlayesByUser(userData.id);
                setOrganizationUsers(OrganizationUsers);

                setUser(userData);
            } catch (error: unknown) {
                if (isAxiosError(error) && error.response?.status === 401) {
                    logout();
                }
            } finally {
                setIsLoading(false); // Finish loading
            }
        } else {
            setIsLoading(false);
            navigate('/login');
        }
    };

    useEffect(() => {
        loadUser(); // Load user details on initial render if token exists
    }, [token]);

    // Type guard to check if error is an AxiosError
    function isAxiosError(error: unknown): error is AxiosError {
        return axios.isAxiosError(error);
    }

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout, loadUser, organizationUsers }}>
            {children}
        </AuthContext.Provider>
    );
};
