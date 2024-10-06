'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Button from '../../components/common/Button';

interface ImageWithLabel {
    url: string;
    label: string;
}

interface ImageState extends ImageWithLabel {
    id: number;
}

type DragItem = {
    id: number;
    fromGroup: string | null;
    type: 'image';
};

// Utility function to shuffle an array
const shuffleArray = (array: ImageState[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
};

const DraggableImage: React.FC<{ img: ImageState; fromGroup: string | null }> = ({ img, fromGroup }) => {
    const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>(() => ({
        type: 'image',
        item: { id: img.id, fromGroup, type: 'image' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="shadow-lg bg-white cursor-grab transition-all transform hover:scale-105"
        >
            <img
                src={img.url}
                alt={img.label}
                className="rounded-md w-full h-[168px] object-cover shadow-sm transition-all duration-100 hover:scale-100"
            />
        </div>
    );
};

const DropArea: React.FC<{
    groupName: string;
    onDrop: (id: number, fromGroup: string | null) => void;
    images: ImageState[];
}> = ({ groupName, onDrop, images }) => {
    const [, drop] = useDrop<DragItem>(() => ({
        accept: 'image',
        canDrop: (item) => item.fromGroup !== groupName,
        drop: (item) => onDrop(item.id, item.fromGroup),
    }));

    return (
        <div
            ref={drop}
            className="w-72 min-h-[300px] border-4 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-start p-4 transition-colors duration-300 hover:border-blue-600 bg-gray-50"
        >
            <p className="text-xl font-medium text-gray-700 mb-2">{groupName}</p>
            <div className="grid grid-cols-2 gap-2 w-full">
                {images.map((img) => (
                    <DraggableImage key={img.id} img={img} fromGroup={groupName} />
                ))}
            </div>
        </div>
    );
};

const MainDropArea: React.FC<{
    onDrop: (id: number, fromGroup: string | null) => void;
    images: ImageState[];
}> = ({ onDrop, images }) => {
    const [, drop] = useDrop<DragItem>(() => ({
        accept: 'image',
        canDrop: (item) => item.fromGroup !== null,
        drop: (item) => {
            if (item.fromGroup) {
                onDrop(item.id, item.fromGroup);
            }
        },
    }));

    return (
        <div
            ref={drop}
            className="relative flex justify-center items-center flex-nowrap overflow-x-auto gap-4 mb-12 min-h-[200px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-white"
        >
            {images.map((img) => (
                <DraggableImage key={img.id} img={img} fromGroup={null} />
            ))}
        </div>
    );
};

const DisplayImagesPageComponent: React.FC = () => {
    const router = useRouter();
    const [images, setImages] = useState<ImageState[]>([]);
    const [groups, setGroups] = useState<{ [groupName: string]: ImageState[] }>({
        'Group 1': [],
        'Group 2': [],
    });

    const predefinedGroups = ['Group 1', 'Group 2'];

    useEffect(() => {
        const storedImages = localStorage.getItem('generatedImagesWithLabels');
        if (storedImages) {
            try {
                const parsedImages: ImageWithLabel[] = JSON.parse(storedImages);
                const initializedImages: ImageState[] = parsedImages.map((img, index) => ({
                    id: index,
                    url: img.url,
                    label: img.label,
                }));

                // Shuffle the images before setting them to state
                setImages(shuffleArray(initializedImages));
            } catch (error) {
                console.error('Error parsing images:', error);
                router.push('/');
            }
        } else {
            router.push('/');
        }
    }, [router]);

    const handleDrop = (groupName: string, id: number, fromGroup: string | null) => {
        const draggedImage = fromGroup
            ? groups[fromGroup].find((img) => img.id === id)
            : images.find((img) => img.id === id);

        if (draggedImage) {
            if (fromGroup) {
                // Remove from the original group
                setGroups((prevGroups) => ({
                    ...prevGroups,
                    [fromGroup]: prevGroups[fromGroup].filter((img) => img.id !== id),
                }));
            } else {
                // Remove from the main images list
                setImages((prevImages) => prevImages.filter((img) => img.id !== id));
            }

            // Add to the new group
            setGroups((prevGroups) => ({
                ...prevGroups,
                [groupName]: [...(prevGroups[groupName] || []), draggedImage],
            }));
        }
    };

    const handleDropToMain = (id: number, fromGroup: string | null) => {
        if (fromGroup) {
            const draggedImage = groups[fromGroup].find((img) => img.id === id);
            if (draggedImage) {
                // Remove from the group
                setGroups((prevGroups) => ({
                    ...prevGroups,
                    [fromGroup]: prevGroups[fromGroup].filter((img) => img.id !== id),
                }));
                // Add back to main images
                setImages((prevImages) => [...prevImages, draggedImage]);
            }
        }
    };

    const handleSubmitGroups = () => {
        console.log('Groups:', groups);
        alert('Groups submitted successfully!');
        localStorage.removeItem('generatedImagesWithLabels');
        router.push('/');
    };

    const handleGoToMainPage = () => {
        router.push('/');
    };

    const handleTryDifferentEnvironment = () => {
        router.push('/try-different-environment');
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-4xl font-bold mb-6 text-center text-blue-700">
                    Memory Exercise: Group Images
                </h2>
                <p className="text-center mb-10 text-lg text-gray-600">
                    Drag and drop the images into your own groupings!
                </p>

                {/* Main Drop Area (initially in one row, centered) */}
                <MainDropArea onDrop={handleDropToMain} images={images} />

                {/* Drop Areas (2x2 grid layout after drop) */}
                <div className="flex justify-center gap-8 mb-12">
                    {predefinedGroups.map((group) => (
                        <DropArea
                            key={group}
                            groupName={group}
                            onDrop={(id, fromGroup) => handleDrop(group, id, fromGroup)}
                            images={groups[group] || []}
                        />
                    ))}
                </div>



                {/* Submit Button */}
                <div className="flex justify-center mt-8 space-x-4">
                    <Button
                        variant="primary"
                        size="large"
                        onClick={handleSubmitGroups}
                        className="transition-all transform hover:scale-105"
                    >
                        Submit Groups
                    </Button>

                    {/* Button for Main Page */}
                    <Button
                        variant="secondary"
                        size="large"
                        onClick={handleGoToMainPage}
                        className="transition-all transform hover:scale-105"
                    >
                        Main Page
                    </Button>

                    {/* Button for Try Different Environment */}
                    <Button
                        variant="secondary"
                        size="large"
                        onClick={() => router.push('/environments/4')}
                        className="transition-all transform hover:scale-105"
                    >


                        Try Different Environment
                    </Button>
                </div>
            </div>
        </DndProvider>
    );
};

export default DisplayImagesPageComponent;
