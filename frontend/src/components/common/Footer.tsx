// frontend/src/components/common/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Digital Memory Playground. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
