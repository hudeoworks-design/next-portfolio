import React from 'react';
import Image from 'next/image';

type Feedback = {
    name: string;
    message: string;
    avatarUrl?: string;
};

const feedbacks: Feedback[] = [
    {
        name: 'Alice Johnson',
        message: 'Great portfolio! The design is clean and easy to navigate.',
        avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        name: 'Bob Smith',
        message: 'Impressive projects and clear code samples.',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        name: 'Carol Lee',
        message: 'Loved the animations and responsiveness!',
        avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
];

const Feedbacks: React.FC = () => (
    <section>
        <h2 className="text-2xl font-bold mb-4">Feedbacks</h2>
        <div className="space-y-4">
            {feedbacks.map((fb, idx) => (
                <div
                    key={idx}
                    className="flex items-start bg-gray-100 rounded-lg p-4 shadow"
                >
                        <Image
                            src={fb.avatarUrl || '/default-avatar.png'}
                            alt={fb.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full mr-4"
                        />
                    <div>
                        <p className="font-semibold">{fb.name}</p>
                        <p className="text-gray-700">{fb.message}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default Feedbacks;