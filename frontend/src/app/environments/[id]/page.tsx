'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { environments } from '../../../data/environments';
import Button from '../../../components/common/Button';
import { FaSpinner } from 'react-icons/fa';

interface CategoryResponse {
    category: string;
    words: string[];
    images: { [word: string]: string | null };
}

interface ImageWithLabel {
    url: string;
    label: string;
}

const EnvironmentPage: React.FC = () => {
    const { id } = useParams();
    const router = useRouter();
    const [input, setInput] = useState<string>('');
    const [submittedWords, setSubmittedWords] = useState<string[]>([]);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const environmentId = Number(id);
    const environment = environments.find((env) => env.id === environmentId);

    // Load submitted words from localStorage
    useEffect(() => {
        const storedWords = localStorage.getItem(`submittedWords-${environmentId}`);
        if (storedWords) {
            setSubmittedWords(JSON.parse(storedWords));
        }
    }, [environmentId]);

    // Save submitted words to localStorage
    useEffect(() => {
        if (submittedWords.length > 0) {
            localStorage.setItem(`submittedWords-${environmentId}`, JSON.stringify(submittedWords));
        }
    }, [submittedWords, environmentId]);

    if (!environment) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Environment Not Found</h1>
                <Button variant="primary" size="medium" onClick={() => router.push('/')}>
                    Go Back Home
                </Button>
            </div>
        );
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            const words = input
                .split(',')
                .map((word) => word.trim())
                .filter((word) => word !== '');
            if (words.length === 0) {
                alert('Please enter at least one word.');
                return;
            }
            setSubmittedWords(words);
            setInput('');
            setHasSubmitted(true); // Set this to true after submission
            await sendWordsToBackend(words);
        }
    };

    // Send words to the backend API
    const sendWordsToBackend = async (words: string[]) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ words }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong.');
            }

            const data = await response.json();
            const categoriesData: CategoryResponse[] = data.categories;

            const imagesWithLabels: ImageWithLabel[] = categoriesData.flatMap((category) =>
                category.words.map((word) => {
                    const imageUrl = category.images[word];
                    return imageUrl ? { url: imageUrl, label: category.category } : null;
                }).filter(Boolean) as ImageWithLabel[]
            );

            localStorage.setItem('generatedImagesWithLabels', JSON.stringify(imagesWithLabels));
            router.push('/displayimages');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center">
            <div className="container mx-auto px-6 py-12 pb-36">
                {/* Two-column layout in a hero section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Image */}
                    <div className="flex justify-center">
                        <Image
                            src={environment.image}
                            alt={`${environment.name} Image`}
                            width={800} // Larger image
                            height={533} // Aspect ratio maintained
                            className="rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Right Column: Form and Text */}
                    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col justify-center text-left"> {/* Left-aligned text */}
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to the {environment.name}!</h1>
                        <p className="text-lg text-gray-700 mb-6">
                            Enter words related to this environment (e.g., objects or items you might find here), and we'll generate an interactive experience based on those words.
                        </p>

                        <form onSubmit={handleSubmit} className="w-full max-w-lg">
                            <input
                                type="text"
                                id="word-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                placeholder="e.g., Apple, Fork, Table, Animal"
                                required
                            />
                            <Button
                                variant="primary"
                                size="large"
                                type="submit"
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
                            >
                                Submit
                            </Button>

                        </form>

                        {/* Show submitted words only after submission */}
                        {hasSubmitted && submittedWords.length > 0 && (
                            <SubmittedWordsList submittedWords={submittedWords} />
                        )}

                        {/* Show loading spinner */}
                        {loading && (
                            <div className="mt-6 text-blue-500 flex items-center">
                                <FaSpinner className="animate-spin mr-2" /> Processing...
                            </div>
                        )}

                        {/* Show error message */}
                        {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Extract SubmittedWordsList into a reusable component
const SubmittedWordsList: React.FC<{ submittedWords: string[] }> = ({ submittedWords }) => {
    return (
        <div className="w-full max-w-lg mt-6 bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Submitted Words:</h2>
            <div className="flex flex-wrap gap-2">
                {submittedWords.map((word, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                        {word}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default EnvironmentPage;
