import React from 'react';
import { Environment } from '../data/environments';
import Link from 'next/link'; // If you're using Next.js; otherwise, use <a> for normal HTML links

interface EnvironmentCardProps {
    environment: Environment;
}

const EnvironmentCard: React.FC<EnvironmentCardProps> = ({ environment }) => {
    return (
        <Link href={`/environments/${environment.id}`}>
            <div className="group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <img
                    src={environment.image}
                    alt={environment.name}
                    className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300"
                />
                {/* Environment Name below the image */}
                <div className="py-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {environment.name}
                    </h3>
                </div>
            </div>
        </Link>
    );
};

export default EnvironmentCard;
