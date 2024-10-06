// frontend/src/app/layout.tsx

import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import './globals.css';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
        <head />
        <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        </body>
        </html>
    );
};

export default RootLayout;
