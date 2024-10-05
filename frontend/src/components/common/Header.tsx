// frontend/src/components/common/Header.tsx

import Image from 'next/image';
import React from 'react';
import classNames from 'classnames';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className="bg-primary text-white p-6 shadow-md flex items-center justify-between">
            <div className="flex items-center">
                <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
                <h1 className="text-3xl font-bold ml-4">{title}</h1>
            </div>
            {/* Placeholder for future navigation links or icons */}
            {/* Example: <nav>...</nav> */}
        </header>
    );
};

export default Header;
