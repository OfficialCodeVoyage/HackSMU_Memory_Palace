// frontend/src/app/layout.tsx
'use client'

import { AppProvider } from '@context/AppContext'; // Adjust path if necessary
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import './globals.css';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
        <body className="flex flex-col min-h-screen">
        <AppProvider> {/* Wrap the whole application in the AppProvider */}
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </AppProvider>
        </body>
        </html>
    );
};

export default RootLayout;
