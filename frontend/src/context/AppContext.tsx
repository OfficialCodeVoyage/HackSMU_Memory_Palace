// frontend/src/context/AppContext.tsx
'use client';

import React, { createContext, useState, ReactNode } from 'react';

interface AppContextProps {
    selectedEnvironment: string | null;
    setSelectedEnvironment: (env: string | null) => void;
}

export const AppContext = createContext<AppContextProps>({
    selectedEnvironment: null,
    setSelectedEnvironment: () => {},
});

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(null);

    return (
        <AppContext.Provider value={{ selectedEnvironment, setSelectedEnvironment }}>
            {children}
        </AppContext.Provider>
    );
};
