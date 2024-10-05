// frontend/src/components/EnvironmentGrid.tsx

import React from 'react';
import EnvironmentCard from './EnvironmentCard';

interface Environment {
    id: string;
    name: string;
    thumbnail: string;
}

interface EnvironmentGridProps {
    environments: Environment[];
    onSelectEnvironment: (id: string) => void;
}

const EnvironmentGrid: React.FC<EnvironmentGridProps> = ({
                                                             environments,
                                                             onSelectEnvironment,
                                                         }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {environments.map((env) => (
                <EnvironmentCard
                    key={env.id}
                    id={env.id}
                    name={env.name}
                    thumbnail={env.thumbnail}
                    onSelect={onSelectEnvironment}
                />
            ))}
        </div>
    );
};

export default EnvironmentGrid;
