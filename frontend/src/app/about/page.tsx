import React from 'react';
import { FaPuzzlePiece, FaHome, FaGlobe, FaExclamationCircle } from 'react-icons/fa'; // Import icons

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12">
            <div className="container mx-auto px-6 text-left">
                <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">About Digital Memory Playground</h2>

                {/* Section Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
                        <FaPuzzlePiece className="text-6xl text-indigo-600 mb-4 mx-auto"/>
                        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                            Creating a Digital Memory Playground
                        </h3>
                        <p className="text-gray-700 text-center">
                            Helping boost memory recall and retention through engaging activities that challenge the
                            mind.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
                        <FaHome className="text-6xl text-green-600 mb-4 mx-auto"/>
                        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                            Using the Memory Palace Technique
                        </h3>
                        <p className="text-gray-700 text-center">
                            Associating memories with familiar places to slow cognitive decline for those affected by
                            Alzheimer’s and dementia.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
                        <FaGlobe className="text-6xl text-pink-600 mb-4 mx-auto"/>
                        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                            Built for Everyone
                        </h3>
                        <p className="text-gray-700 text-center">
                            Designed for all, especially seniors and those affected by Alzheimer’s, with accessible
                            exercises for cognitive health.
                        </p>
                    </div>
                </div>

                {/* Urgent Call to Action */}
                <div className="bg-red-50 rounded-lg shadow-lg mt-12 p-8 text-center">
                    <FaExclamationCircle className="text-5xl text-red-500 mb-4 mx-auto"/>
                    <h3 className="text-3xl font-bold text-red-600 mb-4">Why this matters</h3>
                    <p className="text-lg text-gray-700 mb-4">
                        Alzheimer’s and dementia affect not just individuals but also families, friends, and caregivers.
                        Early intervention is crucial to slowing memory loss and maintaining quality of life.
                    </p>
                    <ul className="text-lg text-gray-700 list-disc list-inside mb-4">
                        <li>These conditions place an emotional and physical strain on caregivers.</li>
                        <li>Early detection and mental exercises can help reduce the rate of decline.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
