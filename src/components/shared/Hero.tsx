import React from "react";

interface HeroProps {
    title: string;
    subtitle?: string;
    backgroundImageUrl?: string;
    children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({
    title,
    subtitle,
    backgroundImageUrl,
    children,
}) => {
    return (
        <section
            className="relative flex items-center justify-center h-96 bg-gray-900 text-white"
            style={
                backgroundImageUrl
                    ? {
                            backgroundImage: `url(${backgroundImageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }
                    : undefined
            }
        >
            <div className="absolute inset-0 bg-black bg-opacity-60" />
            <div className="relative z-10 flex flex-col items-center text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
                {subtitle && (
                    <p className="text-lg md:text-2xl font-medium mb-6">{subtitle}</p>
                )}
                {children}
            </div>
        </section>
    );
};

export default Hero;