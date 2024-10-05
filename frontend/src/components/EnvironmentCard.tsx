// frontend/src/components/EnvironmentCard.tsx

import React from 'react';
import Image from 'next/image';
import Button from './common/Button';
import classNames from 'classnames';

interface EnvironmentCardProps {
    id: string;
    name: string;
    thumbnail: string;
    onSelect: (id: string) => void;
}

const EnvironmentCard: React.FC<EnvironmentCardProps> = ({
                                                             id,
                                                             name,
                                                             thumbnail,
                                                             onSelect,
                                                         }) => {
    return (
        <div
            className={classNames(
                'bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl'
            )}
        >
            <div className="w-40 h-40 relative">
                <Image
                    src={thumbnail}
                    alt={`${name} Environment`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                    priority={false}
                    loading="lazy"
                />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-center">{name}</h3>
            <Button
                onClick={() => onSelect(id)}
                variant="primary"
                size="medium"
                className="mt-6"
            >
                Select
            </Button>
        </div>
    );
};

export default EnvironmentCard;
