// frontend/src/components/common/Button.tsx

import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
                                           onClick,
                                           children,
                                           className = '',
                                           variant = 'primary',
                                           size = 'medium',
                                       }) => {
    const baseClasses =
        'font-semibold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-200';

    const variants = {
        primary: 'bg-primary hover:bg-primary-dark text-white',
        secondary: 'bg-secondary hover:bg-secondary-dark text-gray-800',
    };

    const sizes = {
        small: 'py-1 px-3 text-sm',
        medium: 'py-2 px-4 text-base',
        large: 'py-3 px-5 text-lg',
    };

    return (
        <button
            onClick={onClick}
            className={classNames(
                baseClasses,
                variants[variant],
                sizes[size],
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;
