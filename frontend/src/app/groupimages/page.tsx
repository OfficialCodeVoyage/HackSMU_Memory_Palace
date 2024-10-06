// File path: src/app/groupimages/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const GroupImagesPage: React.FC = () => {
    // Mock database of images and their categories
    const itemDatabase = {
        fruits: ['apple', 'grape', 'orange', 'mango'],
        utensils: ['knife', 'spoon', 'plate', 'cup'],
    };

    const [images, setImages] = useState<string[]>([]);
    const [imageStates, setImageStates] = useState<any[]>([]);
    const [isGroupedCorrectly, setIsGroupedCorrectly] = useState(false);

    // User input for categories
    const [userInput, setUserInput] = useState({ fruit: '', utensil: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInput((prevState) => ({ ...prevState, [name]: value }));
    };

    const generateItems = () => {
        // Generate 4 items for each category based on input
        const generatedFruits = itemDatabase.fruits.slice(0, 4);
        const generatedUtensils = itemDatabase.utensils.slice(0, 4);

        const newImages = [...generatedFruits, ...generatedUtensils];
        setImages(newImages);
        setImageStates(newImages.map(() => ({ x: 0, y: 0, dragging: false })));
    };

    const handleMouseDown = (index: number, e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        const offsetX = e.clientX - imageStates[index].x;
        const offsetY = e.clientY - imageStates[index].y;
        setImageStates((prevState) =>
            prevState.map((state, i) =>
                i === index ? { ...state, dragging: true, offsetX, offsetY } : state
            )
        );
    };

    const handleMouseMove = (e: MouseEvent) => {
        setImageStates((prevState) =>
            prevState.map((state) => {
                if (state.dragging) {
                    return {
                        ...state,
                        x: e.clientX - state.offsetX,
                        y: e.clientY - state.offsetY,
                    };
                }
                return state;
            })
        );
    };

    const handleMouseUp = () => {
        setImageStates((prevState) => prevState.map((state) => ({ ...state, dragging: false })));
        checkGrouping();
    };

    const checkGrouping = () => {
        // Check if images are grouped correctly (fruit vs. utensils)
        const fruits = imageStates.filter((state, index) => itemDatabase.fruits.includes(images[index]));
        const utensils = imageStates.filter((state, index) => itemDatabase.utensils.includes(images[index]));

        const isFruitsGrouped = fruits.every(
            (state) =>
                Math.abs(state.x - fruits[0].x) < 100 &&
                Math.abs(state.y - fruits[0].y) < 100
        );

        const isUtensilsGrouped = utensils.every(
            (state) =>
                Math.abs(state.x - utensils[0].x) < 100 &&
                Math.abs(state.y - utensils[0].y) < 100
        );

        setIsGroupedCorrectly(isFruitsGrouped && isUtensilsGrouped);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold">Digital Memory Playground</h1>
            </header>

            {/* Input form */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">Enter Items</h2>
                <input
                    type="text"
                    name="fruit"
                    value={userInput.fruit}
                    onChange={handleInputChange}
                    placeholder="Enter a fruit"
                    className="mb-2 px-4 py-2 border"
                />
                <input
                    type="text"
                    name="utensil"
                    value={userInput.utensil}
                    onChange={handleInputChange}
                    placeholder="Enter a utensil"
                    className="mb-4 px-4 py-2 border"
                />
                <button className="bg-blue-500 text-white py-2 px-6 rounded" onClick={generateItems}>
                    Generate Items
                </button>
            </div>

            {/* Image Display */}
            <div className="flex justify-center gap-8 mb-8">
                <div className="w-1/4 border-2 border-dashed border-gray-400 p-4 h-[300px] flex items-start justify-center">
                    <p className="text-gray-500 mb-2">Fruit Area</p>
                </div>
                <div className="w-1/2 grid grid-cols-3 gap-8">
                    {images.map((imageUrl, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'relative',
                                left: `${imageStates[index].x}px`,
                                top: `${imageStates[index].y}px`,
                            }}
                        >
                            <Image
                                src={`/images/${imageUrl}.png`} // Adjust based on your image path
                                alt={`Image ${index}`}
                                width={150}
                                height={150}
                                className="generated-image m-4"
                                style={{
                                    cursor: imageStates[index].dragging ? 'grabbing' : 'grab',
                                    userSelect: 'none',
                                    transition: imageStates[index].dragging ? 'none' : 'transform 0.1s',
                                    boxShadow: '5px 5px 15px rgba(0,0,0,0.1)',
                                    borderRadius: '8px',
                                }}
                                onMouseDown={(e) => handleMouseDown(index, e)}
                                onDragStart={(e) => e.preventDefault()} // Prevent default drag image behavior
                            />
                        </div>
                    ))}
                </div>
                <div className="w-1/4 border-2 border-dashed border-gray-400 p-4 h-[300px] flex items-start justify-center">
                    <p className="text-gray-500 mb-2">Utensils Area</p>
                </div>
            </div>

            <div className="flex gap-4 justify-center mt-8">
                <button
                    className={`bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 mr-4 ${isGroupedCorrectly ? '' : 'opacity-50 cursor-not-allowed'}`}
                    onClick={() => window.location.href = `/environments/${Math.floor(Math.random() * 4) + 1}`}
                    disabled={!isGroupedCorrectly}
                >
                    Try a New Scene
                </button>
            </div>
            <footer className="text-center mt-8">
                <p className="text-gray-600">&copy; 2024 Digital Memory Playground</p>
            </footer>
        </div>
    );
};

export default GroupImagesPage;
