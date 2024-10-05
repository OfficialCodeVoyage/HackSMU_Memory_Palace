import React from 'react';

const InstructionPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">How to Use Digital Memory Playground</h1>
            <ol className="list-decimal list-inside text-lg">
                <li className="mb-2">
                    <strong>Select a Scene:</strong> Choose a scene (Kitchen, Farm, Library, Office) by clicking the "Select" button.
                </li>
                <li className="mb-2">
                    <strong>Engage with Exercises:</strong> Complete the exercises shown for each scene.
                </li>
                <li className="mb-2">
                    <strong>Monitor Your Progress:</strong> Track your progress as you go through the scenes.
                </li>
                <li>
                    <strong>Explore Different Scenes:</strong> Try different scenes to experience varied cognitive activities.
                </li>
            </ol>
        </div>
    );
};

export default InstructionPage;
