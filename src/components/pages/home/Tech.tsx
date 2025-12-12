import React from 'react';
import Image from 'next/image';

const techStack = [
    { name: 'TypeScript', icon: '/icons/typescript.svg' },
    { name: 'React', icon: '/icons/react.svg' },
    { name: 'Next.js', icon: '/icons/nextjs.svg' },
    { name: 'Node.js', icon: '/icons/nodejs.svg' },
    { name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg' },
    // Add more technologies as needed
];

const Tech: React.FC = () => (
    <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {techStack.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center">
                    <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 mb-2"
                        loading="lazy"
                    />
                    <span className="text-sm">{tech.name}</span>
                </div>
            ))}
        </div>
    </section>
);

export default Tech;