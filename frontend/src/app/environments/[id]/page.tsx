'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { environments } from '../../../data/environments';
import Button from '../../../components/common/Button';

const EnvironmentPage: React.FC = () => {
    const { id } = useParams();
    const router = useRouter();
    const [input, setInput] = useState<string>('');
    const [submittedWords, setSubmittedWords] = useState<string[]>([]);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() !== '' && isValidWord(input, environment.name)) {
            setSubmittedWords((prevWords) => [...prevWords, input.trim()]);
            setInput('');
        } else {
            alert('Please enter a valid word related to the environment.');
        }
    };

    // Simple word validation (this can be extended further)
    const isValidWord = (word: string, environmentName: string): boolean => {
        const validWords = {
            Kitchen: ['knife', 'refrigerator', 'spoon', 'oven'],
            Farm: ['tractor', 'cow', 'barn', 'hay'],
            Library: ['book', 'shelf', 'lamp', 'table'],
            Office: ['computer', 'desk', 'chair', 'printer'],
        };

        const normalizedWord = word.toLowerCase().trim();
        return validWords[environmentName as keyof typeof validWords]?.includes(normalizedWord) ?? false;
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
                    Type a word related to {environment.name}:
                </label>
                <input
                    type="text"
                    id="word-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={`e.g., Knife, Refrigerator`}
                    required
                />
                <Button variant="primary" size="medium" type="submit" className="mt-4 w-full">
                    Submit
                </Button>
            </form>
            {submittedWords.length > 0 && (
                <div className="w-full max-w-md mt-6">
                    <h2 className="text-2xl font-semibold mb-2">Your Words:</h2>
                    <ul className="list-disc list-inside">
                        {submittedWords.map((word, index) => (
                            <li key={index} className="text-lg">
                                {word}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EnvironmentPage;
