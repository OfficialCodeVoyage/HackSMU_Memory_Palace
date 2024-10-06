// frontend/src/app/page.tsx

import React from 'react';
import EnvironmentGrid from '../components/EnvironmentGrid';
import { environments } from '../data/environments';

const HomePage: React.FC = () => {
  return <EnvironmentGrid environments={environments} />;
};

export default HomePage;
