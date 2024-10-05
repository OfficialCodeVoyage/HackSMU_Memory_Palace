'use client'; // This makes the component a client component

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Environment } from '../data/environments';

interface EnvironmentCardProps {
    environment: Environment;
}

const EnvironmentCard: React.FC<EnvironmentCardProps> = ({ environment }) => {
    return (
        <div
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 focus-within:shadow-lg"
            tabIndex={0} // Make the entire card focusable
            role="button" // Announce the card as a button for screen readers
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    document.getElementById(`env-link-${environment.id}`)?.click();
                }
            }}
        >
            <Image
                src={environment.image}
                alt={`An interactive scene of a ${environment.name}`}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
                onError={(e) => {
                    e.currentTarget.src = '/images/placeholder.png'; // Provide a placeholder image
                }}
            />
            <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-2">{environment.name}</h3>
                <Link
                    id={`env-link-${environment.id}`}
                    href={`/environments/${environment.id}`}
                    className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    Select
                </Link>
            </div>
        </div>
    );
};

export default EnvironmentCard;
