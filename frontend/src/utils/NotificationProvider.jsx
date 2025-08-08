import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMyUnreadNotifications } from '@/services/parcAutoService';
import { useAuth } from './AuthProvider';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [unreadCount, setUnreadCount] = useState(0);
    const { userDetails } = useAuth();

    const fetchUnreadCount = useCallback(async () => {
        if (!userDetails) {
            setUnreadCount(0);
            return;
        }
        try {
            const response = await getMyUnreadNotifications();
            setUnreadCount(response.data.length);
        } catch (error) {
            console.error("Failed to fetch unread notifications count", error);
            setUnreadCount(0);
        }
    }, [userDetails]);

    useEffect(() => {
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000); // Rafraîchit toutes les 30s
        return () => clearInterval(interval);
    }, [fetchUnreadCount]);

    const value = {
        unreadCount,
        refreshNotifications: fetchUnreadCount,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};