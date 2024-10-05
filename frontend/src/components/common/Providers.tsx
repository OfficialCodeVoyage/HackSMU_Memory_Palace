// frontend/src/components/common/Providers.tsx
"use client";

import React from 'react';
import { AppProvider } from '@/context/AppContext';

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return <AppProvider>{children}</AppProvider>;
};

export default Providers;
