'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const DisplayImagesPage = () => {
    // Assuming all images are in the public/images folder
    const images = ['/images/kitchen.png', '/images/farm.png', '/images/placeholder.png'];

    const [imageStates, setImageStates] = useState(images.map(() => ({ x: 0, y: 0, dragging: false, offsetX: 0, offsetY: 0 })));

    const handleMouseDown = (index, e) => {
        e.stopPropagation();
        const offsetX = e.clientX - imageStates[index].x;
        const offsetY = e.clientY - imageStates[index].y;
        setImageStates((prevState) =>
            prevState.map((state, i) => (i === index ? { ...state, dragging: true, offsetX, offsetY } : state))
        );
    };

    const handleMouseMove = (e) => {
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
        <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Images</h2>
            <p className="mb-6">Drag the images into your own groupings!</p>
            <div className="relative">
                {images.map((imageUrl, index) => (
                    <Image
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index}`}
                        width={200}
                        height={200}
                        className="generated-image"
                        style={{
                            position: 'absolute',
                            left: `${imageStates[index].x}px`,
                            top: `${imageStates[index].y}px`,
                            cursor: imageStates[index].dragging ? 'grabbing' : 'grab',
                            userSelect: 'none',
                            transition: 'transform 0.1s',
                        }}
                        onMouseDown={(e) => handleMouseDown(index, e)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DisplayImagesPage;