import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
    variant: 'primary' | 'secondary';
    size: 'small' | 'medium' | 'large';
    onClick?: () => void;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant, size, onClick, children, type = 'button', className }) => {
    const buttonClass = classNames(
        'px-4 py-2 rounded focus:outline-none transition-colors duration-300',
        {
            'bg-primary text-white hover:bg-secondary': variant === 'primary',
            'bg-gray-200 text-gray-700 hover:bg-gray-300': variant === 'secondary',
            'text-sm': size === 'small',
            'text-base': size === 'medium',
            'text-lg': size === 'large',
        },
        className
    );

    return (
        <button className={buttonClass} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;
