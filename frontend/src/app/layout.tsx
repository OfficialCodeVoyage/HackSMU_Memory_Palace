// frontend/src/app/layout.tsx

import './globals.css';
import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { AppProvider } from '@/context/AppContext';
import { Poppins, Roboto } from '@next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-poppins',
});

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-roboto',
});

export const metadata = {
    title: 'Digital Memory Playground',
    description:
        'Enhancing memory and cognitive skills for seniors and individuals with cognitive impairments.',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
        <body
            className={`${poppins.variable} ${roboto.variable} flex flex-col min-h-screen font-roboto`}
        >
        <AppProvider>
            <Header title="Digital Memory Playground" />
            <main className="flex-grow container mx-auto p-4">{children}</main>
            <Footer />
        </AppProvider>
        </body>
        </html>
    );
};

export default RootLayout;
