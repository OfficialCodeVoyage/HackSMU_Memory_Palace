// frontend/src/app/environments/[id]/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { environments } from '../../../data/environments';
import Button from '../../../components/common/Button';

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
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const environmentId = Number(id);
    const environment = environments.find((env) => env.id === environmentId);

    useEffect(() => {
        // Load submitted words from localStorage when the component mounts
        const storedWords = localStorage.getItem(`submittedWords-${environmentId}`);
        if (storedWords) {
            setSubmittedWords(JSON.parse(storedWords));
        }
    }, [environmentId]);

    useEffect(() => {
        // Save submitted words to localStorage whenever they change
        localStorage.setItem(`submittedWords-${environmentId}`, JSON.stringify(submittedWords));
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() !== '') {
            // Split input by commas and trim spaces
            const words = input.split(',').map(word => word.trim()).filter(word => word !== '');
            if (words.length === 0) {
                alert('Please enter at least one word.');
                return;
            }
            setSubmittedWords(words);
            setInput('');
            await sendWordsToBackend(words);
        }
    };

    const sendWordsToBackend = async (words: string[]) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    words: words,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong.');
            }

            const data = await response.json();
            const categoriesData: CategoryResponse[] = data.categories;

            // Extract image URLs with labels
            const imagesWithLabels: ImageWithLabel[] = [];

            categoriesData.forEach((category) => {
                const categoryName = category.category;
                const words = category.words;
                words.forEach((word) => {
                    const imageUrl = category.images[word];
                    if (imageUrl) {
                        imagesWithLabels.push({ url: imageUrl, label: categoryName });
                    }
                });
            });

            // Store image URLs with labels in localStorage
            localStorage.setItem('generatedImagesWithLabels', JSON.stringify(imagesWithLabels));

            // Navigate to displayimages page
            router.push('/displayimages');
        } catch (err: never) {
            console.error(err);
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">{environment.name}</h1>
            <div className="w-full max-w-md">
                <Image
                    src={environment.image}
                    alt={`${environment.name} Image`}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-md"
                />
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-md mt-6">
                <label htmlFor="word-input" className="block text-lg font-medium mb-2">
                    Enter words related to {environment.name} (separated by commas):
                </label>
                <input
                    type="text"
                    id="word-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`e.g., Apple, Banana, Carrot`}
                    required
                />
                <Button variant="primary" size="medium" type="submit" className="mt-4 w-full">
                    Submit
                </Button>
            </form>
            {loading && <p className="mt-4 text-blue-500">Processing...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default EnvironmentPage;
