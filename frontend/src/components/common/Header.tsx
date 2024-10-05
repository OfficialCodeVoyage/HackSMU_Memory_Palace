import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-primary text-white shadow">
            <nav className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center">
                    <img src="/images/logo.png" alt="Digital Memory Playground Logo" className="h-8 w-8 mr-2" />
                    <span className="font-semibold text-xl">Digital Memory Playground</span>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:text-secondary">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:text-secondary">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/instruction" className="hover:text-secondary">
                            Instruction
                        </Link>
                    </li>
                    <li>
                        <a
                            href="https://github.com/your-repo-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-secondary"
                        >
                            GitHub
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
