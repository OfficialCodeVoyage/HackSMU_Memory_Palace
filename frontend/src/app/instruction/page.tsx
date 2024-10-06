import React from 'react';
import { FaMousePointer, FaTasks, FaChartLine, FaCubes } from 'react-icons/fa'; // Import icons for each step

const InstructionPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-16">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-5xl font-bold text-gray-800 mb-12">How to Use Digital Memory Playground</h1>

                {/* Instructions List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Step 1 */}
                    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl hover:bg-blue-50">
                        <FaMousePointer className="text-5xl text-blue-500 mb-6" /> {/* Icon centered */}
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select a Scene</h2>
                        <p className="text-gray-600">
                            Choose a scene (Kitchen, Farm, Library, Office) by clicking the "Select" button.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl hover:bg-green-50">
                        <FaTasks className="text-5xl text-green-500 mb-6" /> {/* Icon centered */}
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Engage with Exercises</h2>
                        <p className="text-gray-600">
                            Complete the exercises shown for each scene to practice memory and cognitive tasks.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl hover:bg-purple-50">
                        <FaChartLine className="text-5xl text-purple-500 mb-6" /> {/* Icon centered */}
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monitor Your Progress</h2>
                        <p className="text-gray-600">
                            Track your progress as you go through each scene and see improvements over time.
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl hover:bg-pink-50">
                        <FaCubes className="text-5xl text-pink-500 mb-6" /> {/* Icon centered */}
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Explore Different Scenes</h2>
                        <p className="text-gray-600">
                            Try different scenes to experience varied cognitive challenges and memory exercises.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16">
                    <a
                        href="http://localhost:3000/environments/1"
                        className="inline-block bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-md shadow-lg hover:bg-blue-700 transition-colors"
                    >
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InstructionPage;
