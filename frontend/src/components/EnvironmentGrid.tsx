import React from 'react';
import EnvironmentCard from './EnvironmentCard';
import { Environment } from '../data/environments';

interface EnvironmentGridProps {
    environments: Environment[];
}

const EnvironmentGrid: React.FC<EnvironmentGridProps> = ({ environments }) => {
    return (
        <div className="container mx-auto pt-0 px-0 py-20">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {environments.map((env) => (
                    <EnvironmentCard key={env.id} environment={env} />
                ))}
            </div>
        </div>
    );
};

export default EnvironmentGrid;
