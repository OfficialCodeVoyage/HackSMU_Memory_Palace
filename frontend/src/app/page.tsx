import React from 'react';
import EnvironmentGrid from '../components/EnvironmentGrid';  // Keep the EnvironmentGrid import
import { environments } from '../data/environments';  // Keep the environments data import
import HeroSection from '../components/HeroSection';  // Import the HeroSection component

const HomePage: React.FC = () => {
  return (
      <div className="bg-white">
        <HeroSection />
        <EnvironmentGrid environments={environments} />
      </div>
  );
};

export default HomePage;
