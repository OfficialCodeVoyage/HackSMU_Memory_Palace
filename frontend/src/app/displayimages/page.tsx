// frontend/src/app/displayimages/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../components/common/Button';

interface ImageState {
    id: number;
    url: string;
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

    // Retrieve images from localStorage on component mount
    useEffect(() => {
        const storedImages = localStorage.getItem('generatedImages');
        if (storedImages) {
            try {
                const parsedImages: string[] = JSON.parse(storedImages);
                const initializedImages: ImageState[] = parsedImages.map((url, index) => ({
                    id: index,
                    url: url,
                    x: 0,
                    y: 0,
                    dragging: false,
                    offsetX: 0,
                    offsetY: 0,
                }));
                setImages(initializedImages);
            } catch (error) {
                console.error('Error parsing generatedImages from localStorage:', error);
                router.push('/');
            }
        } else {
            // If no images found, navigate back to home
            router.push('/');
        }
    }, [router]);

    // Handle mouse down event to start dragging
    const handleMouseDown = (index: number, e: React.MouseEvent<HTMLImageElement>) => {
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

    // Handle submission of groups
    const handleSubmitGroups = () => {
        // Placeholder for group submission logic
        // You can implement grouping logic here or send data to backend
        alert('Groups submitted successfully!');
        // Optionally, clear the stored images
        localStorage.removeItem('generatedImages');
        // Navigate back to home or another page
        router.push('/');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4 text-center">Memory Exercise: Group Images</h2>
            <p className="text-center mb-6">Drag and drop the images to group them based on your memory exercise.</p>
            <div className="relative w-full h-screen border border-gray-300">
                {images.map((img, index) => (
                    <img
                        key={img.id}
                        src={img.url}
                        alt={`Generated Image ${index + 1}`}
                        className="absolute cursor-grab"
                        style={{
                            left: `${img.x}px`,
                            top: `${img.y}px`,
                            width: '150px',
                            height: '150px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            boxShadow: img.dragging ? '0px 0px 10px rgba(0,0,0,0.5)' : 'none',
                            zIndex: img.dragging ? 1000 : 1,
                            transition: img.dragging ? 'none' : 'transform 0.1s',
                            userSelect: 'none',
                        }}
                        onMouseDown={(e) => handleMouseDown(index, e)}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <Button variant="primary" size="medium" onClick={handleSubmitGroups}>
                    Submit Groups
                </Button>
            </div>
        </div>
    );
};

export default DisplayImagesPage;
