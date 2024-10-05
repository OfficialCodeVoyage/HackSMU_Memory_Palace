import React from 'react';
import EnvironmentCard from './EnvironmentCard';
import { Environment } from '../data/environments';

interface EnvironmentGridProps {
    environments: Environment[];
}

const EnvironmentGrid: React.FC<EnvironmentGridProps> = ({ environments }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <p className="text-center text-lg mb-6">Select a scene you want to practice with</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {environments.map((env) => (
                    <EnvironmentCard key={env.id} environment={env} />
                ))}
            </div>
        </div>
    );
};

export default EnvironmentGrid;
