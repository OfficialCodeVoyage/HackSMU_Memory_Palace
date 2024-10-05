// frontend/src/app/page.tsx
'use client';

import React, { useContext } from 'react';
import EnvironmentGrid from '../components/EnvironmentGrid';
import { AppContext } from '../context/AppContext';
import Hero from '../components/Hero';

const environments = [
  {
    id: 'kitchen',
    name: 'Kitchen',
    thumbnail: '/images/kitchen.png',
  },
  {
    id: 'farm',
    name: 'Farm',
    thumbnail: '/images/farm.png',
  },
  {
    id: 'library',
    name: 'Library',
    thumbnail: '/images/library.png',
  },
  // Add more environments as needed
];

const Home: React.FC = () => {
  const { selectedEnvironment, setSelectedEnvironment } = useContext(AppContext);

  const handleSelectEnvironment = (id: string) => {
    setSelectedEnvironment(id);
    // Implement navigation or state updates as needed
    console.log(`Selected Environment: ${id}`);
  };

  return (
      <div className="flex flex-col items-center justify-start w-full min-h-screen p-4 bg-gray-100 space-y-12">
        <Hero onGetStarted={() => console.log('Get Started clicked')} />
        <section className="w-full max-w-6xl">
          <h2 className="text-3xl font-semibold mb-8 text-center">Choose an Environment</h2>
          <EnvironmentGrid
              environments={environments}
              onSelectEnvironment={handleSelectEnvironment}
          />
        </section>
        {selectedEnvironment && (
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-medium">
                You have selected: <span className="text-primary">{selectedEnvironment}</span>
              </h3>
              {/* Placeholder for additional content based on selection */}
            </div>
        )}
      </div>
  );
};

export default Home;
