// frontend/src/context/AppContext.tsx

import React, { createContext, useState, ReactNode } from 'react';
import { Environment } from '../types'; // Ensure correct path

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

    return (
        <AppContext.Provider value={{ selectedEnvironment, setSelectedEnvironment }}>
            {children}
        </AppContext.Provider>
    );
};
