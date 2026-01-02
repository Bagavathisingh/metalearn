import React, { useState, useEffect, createContext, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = (message, type = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setNotifications((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 4000);
    };

    return (
        <NotificationContext.Provider value={showNotification}>
            {children}
            <div className="toast-container">
                {notifications.map((n) => (
                    <div key={n.id} className={`custom-toast toast-${n.type}`}>
                        <div className={`w-2 h-2 rounded-full ${n.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                        <span className="text-sm font-medium">{n.message}</span>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
