// frontend/src/components/Hero.tsx

import React from 'react';
import Image from 'next/image';
import Button from './common/Button';
import classNames from 'classnames';

interface HeroProps {
    onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
    return (
        <section className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
                src="/images/hero-background.jpg"
                alt="Memory Playground Background"
                layout="fill"
                objectFit="cover"
                priority={true}
            />
            <div
                className={classNames(
                    'absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4'
                )}
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
                    Welcome to the Digital Memory Playground
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-center">
                    Enhance your memory and cognitive skills through engaging exercises.
                </p>
                <Button
                    onClick={onGetStarted}
                    variant="primary"
                    size="large"
                    className="mt-6"
                >
                    Get Started
                </Button>
            </div>
        </section>
    );
};

export default Hero;
