// frontend/src/components/Spinner.tsx

import React from 'react';

const Spinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default Spinner;
