import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-white py-4 mt-auto">
            <div className="container mx-auto text-center">
                © {new Date().getFullYear()} Digital Memory Playground. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
