// frontend/src/app/displayimages/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../components/common/Button';

interface ImageWithLabel {
    url: string;
    label: string;
}

interface ImageState extends ImageWithLabel {
    id: number;
    x: number;
    y: number;
    dragging: boolean;
    offsetX: number;
    offsetY: number;
}

const DisplayImagesPage: React.FC = () => {
    const router = useRouter();
    const [images, setImages] = useState<ImageState[]>([]);
    const [currentImage, setCurrentImage] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [groups, setGroups] = useState<{ [groupName: string]: ImageState[] }>({});

    // Predefined group areas (for example purposes)
    const predefinedGroups = ['Group 1', 'Group 2'];

    // Retrieve images from localStorage on component mount
    useEffect(() => {
        const storedImages = localStorage.getItem('generatedImagesWithLabels');
        if (storedImages) {
            try {
                const parsedImages: ImageWithLabel[] = JSON.parse(storedImages);
                const initializedImages: ImageState[] = parsedImages.map((img, index) => ({
                    id: index,
                    url: img.url,
                    label: img.label,
                    x: 0,
                    y: 0,
                    dragging: false,
                    offsetX: 0,
                    offsetY: 0,
                }));
                setImages(initializedImages);
            } catch (error) {
                console.error('Error parsing generatedImagesWithLabels from localStorage:', error);
                router.push('/');
            }
        } else {
            // If no images found, navigate back to home
            router.push('/');
        }
    }, [router]);

    // Handle mouse down event to start dragging
    const handleMouseDown = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling to parent elements

        const imgElement = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - imgElement.left;
        const offsetY = e.clientY - imgElement.top;

        setImages(prevImages =>
            prevImages.map((img, i) =>
                i === index ? { ...img, dragging: true, offsetX, offsetY } : img
            )
        );
        setCurrentImage(index);
        setIsDragging(true);
    };

    // Handle mouse move event to drag the image
    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && currentImage !== null) {
            setImages(prevImages =>
                prevImages.map((img, i) =>
                    i === currentImage
                        ? {
                            ...img,
                            x: e.clientX - img.offsetX,
                            y: e.clientY - img.offsetY,
                        }
                        : img
                )
            );
        }
    };

    // Handle mouse up event to stop dragging
    const handleMouseUp = () => {
        if (isDragging && currentImage !== null) {
            setImages(prevImages =>
                prevImages.map((img, i) =>
                    i === currentImage ? { ...img, dragging: false } : img
                )
            );
        }
        setIsDragging(false);
        setCurrentImage(null);
    };

    // Add and remove event listeners for mouse move and up
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, currentImage]);

    // Handle dropping images into group areas
    const handleDrop = (groupName: string, e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (currentImage !== null) {
            const draggedImage = images[currentImage];
            setGroups(prevGroups => {
                const updatedGroups = { ...prevGroups };
                if (!updatedGroups[groupName]) {
                    updatedGroups[groupName] = [];
                }
                updatedGroups[groupName].push(draggedImage);
                return updatedGroups;
            });
            setImages(prevImages => prevImages.filter((img, i) => i !== currentImage));
            setIsDragging(false);
            setCurrentImage(null);
        }
    };

    // Allow dropping by preventing default behavior
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // Handle submission of groups
    const handleSubmitGroups = () => {
        // Placeholder for group submission logic
        // For example, you can send the groups data to the backend or save it locally
        console.log('Groups:', groups);
        alert('Groups submitted successfully!');
        // Optionally, clear the stored images
        localStorage.removeItem('generatedImagesWithLabels');
        // Navigate back to home or another page
        router.push('/');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4 text-center">Memory Exercise: Group Images</h2>
            <p className="text-center mb-6">Drag and drop the images into your own groupings!</p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {images.map((img, index) => (
                    <div
                        key={img.id}
                        className="border rounded-lg shadow-md p-2 bg-white cursor-grab"
                        style={{
                            width: '150px',
                            textAlign: 'center',
                            position: 'absolute',
                            left: img.x,
                            top: img.y,
                            zIndex: img.dragging ? 1000 : 1,
                            userSelect: 'none',
                        }}
                        onMouseDown={(e) => handleMouseDown(index, e)}
                        draggable
                        onDragStart={(e) => e.preventDefault()} // Prevent default drag behavior
                    >
                        <img
                            src={img.url}
                            alt={img.label}
                            className="rounded"
                            style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                        />
                        <div
                            className="mt-2 text-red-700 font-semibold"
                            style={{
                                transition: 'color 0.3s',
                            }}
                        >
                            {img.label}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-4 mb-8">
                {predefinedGroups.map((group, index) => (
                    <div
                        key={index}
                        className="w-64 h-64 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center"
                        onDrop={(e) => handleDrop(group, e)}
                        onDragOver={handleDragOver}
                    >
                        <p className="text-xl font-medium">{group}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4">
                <Button variant="primary" size="medium" onClick={handleSubmitGroups}>
                    Submit Groups
                </Button>
            </div>
        </div>
    );
};

export default DisplayImagesPage;
