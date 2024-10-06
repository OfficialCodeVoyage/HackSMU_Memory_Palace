// frontend/src/context/AppContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Environment } from '../types';

interface AppContextProps {
    selectedEnvironment: Environment | null;
    setSelectedEnvironment: (env: Environment | null) => void;
}

export const AppContext = createContext<AppContextProps>({
    selectedEnvironment: null,
    setSelectedEnvironment: () => {},
});

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [selectedEnvironment, setSelectedEnvironment] = useState<Environment | null>(null);

    // Load from localStorage on initial mount
    useEffect(() => {
        const savedEnvironment = localStorage.getItem('selectedEnvironment');
        if (savedEnvironment) {
            setSelectedEnvironment(JSON.parse(savedEnvironment));
        }
    }, []);

    // Save to localStorage whenever selectedEnvironment changes
    useEffect(() => {
        if (selectedEnvironment) {
            localStorage.setItem('selectedEnvironment', JSON.stringify(selectedEnvironment));
        }
    }, [selectedEnvironment]);

    return (
        <AppContext.Provider value={{ selectedEnvironment, setSelectedEnvironment }}>
            {children}
        </AppContext.Provider>
    );
};
