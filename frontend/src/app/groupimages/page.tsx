// File path: src/app/groupimages/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const GroupImagesPage: React.FC = () => {
    // Mock images related to an environment (e.g., kitchen and farm items)
    const images = [
        '/images/farm.png',
        '/images/farm.png',
        '/images/farm.png',
        '/images/kitchen.png',
        '/images/kitchen.png',
        '/images/kitchen.png'
    ];

    const [imageStates, setImageStates] = useState(
        images.map(() => ({ x: 0, y: 0, dragging: false, group: null }))
    );
    const [isGroupedCorrectly, setIsGroupedCorrectly] = useState(false);

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
        // Mock check: Check if kitchen images and farm images are grouped close together
        const kitchenGroup = imageStates.filter((state, index) => images[index].includes('knife') || images[index].includes('fork'));
        const farmGroup = imageStates.filter((state, index) => images[index].includes('elephant') || images[index].includes('giraffe'));

        const isKitchenGrouped = kitchenGroup.every(
            (state) =>
                Math.abs(state.x - kitchenGroup[0].x) < 100 &&
                Math.abs(state.y - kitchenGroup[0].y) < 100
        );

        const isFarmGrouped = farmGroup.every(
            (state) =>
                Math.abs(state.x - farmGroup[0].x) < 100 &&
                Math.abs(state.y - farmGroup[0].y) < 100
        );

        if (isKitchenGrouped && isFarmGrouped) {
            setIsGroupedCorrectly(true);
        } else {
            setIsGroupedCorrectly(false);
        }
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
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
                <p className="text-lg">Drag and drop the images to group them according to their category. There are two categories: kitchen items and farm items. Make sure all items from each category are placed close together in the designated drop zones. Once you group them correctly, you'll see buttons to proceed.</p>
            </div>
            <div className="flex justify-center gap-8 mb-8">
                <div className="w-1/4 border-2 border-dashed border-gray-400 p-4 h-[300px] flex items-start justify-center">
                    <p className="text-gray-500 mb-2">Kitchen Items Area</p>
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
                                src={imageUrl}
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
                    <p className="text-gray-500 mb-2">Farm Items Area</p>
                </div>
            </div>
            <div className="flex gap-4 justify-center mt-8">
                <button
                    className={`bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 mr-4 ${
                        isGroupedCorrectly ? '' : 'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => window.location.href = `/environments/${Math.floor(Math.random() * 4) + 1}`}
                    disabled={!isGroupedCorrectly}
                >
                    Try a New Scene
                </button>
                <button
                    className={`bg-purple-500 text-white py-2 px-6 rounded hover:bg-purple-600 ${
                        isGroupedCorrectly ? '' : 'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => {
                        const doubledImages = [...images, ...images];
                        setImageStates(doubledImages.map(() => ({ x: 0, y: 0, dragging: false, group: null })));
                        setIsGroupedCorrectly(false);
                    }}
                    disabled={!isGroupedCorrectly}
                >
                    Make it Harder
                </button>
            </div>
            <footer className="text-center mt-8">
                <p className="text-gray-600">&copy; 2024 Digital Memory Playground</p>
            </footer>
        </div>
    );
};

export default GroupImagesPage;