import React from "react";

const works = [
    {
        title: "Portfolio Website",
        description: "A personal portfolio built with Next.js and TypeScript.",
        link: "https://yourportfolio.com",
    },
    {
        title: "E-commerce Store",
        description: "A full-stack e-commerce application using React and Node.js.",
        link: "https://mystore.com",
    },
    {
        title: "Blog Platform",
        description: "A markdown-based blog platform with authentication.",
        link: "https://myblog.com",
    },
];

const Works: React.FC = () => (
    <section>
        <h2>My Works</h2>
        <ul>
            {works.map((work, idx) => (
                <li key={idx}>
                    <h3>
                        <a href={work.link} target="_blank" rel="noopener noreferrer">
                            {work.title}
                        </a>
                    </h3>
                    <p>{work.description}</p>
                </li>
            ))}
        </ul>
    </section>
);

export default Works;