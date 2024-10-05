export interface Environment {
    id: number;
    name: string;
    image: string;
    description: string;
}

export const environments: Environment[] = [
    {
        id: 1,
        name: 'Kitchen',
        image: '/images/kitchen.png',
        description: 'Enhance your memory with kitchen-related tasks and activities.',
    },
    {
        id: 2,
        name: 'Farm',
        image: '/images/farm.png',
        description: 'Boost your cognitive skills through farm-themed exercises.',
    },
    {
        id: 3,
        name: 'Library',
        image: '/images/library.png',
        description: 'Improve your memory with book and library-inspired challenges.',
    },
    {
        id: 4,
        name: 'Office',
        image: '/images/office.png',
        description: 'Strengthen your cognitive abilities with office-based activities.',
    },
];
