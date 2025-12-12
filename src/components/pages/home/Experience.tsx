import React from "react";
import { useTranslation } from "react-i18next";

interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    description: string;
}

const experiences: ExperienceItem[] = [
    {
        company: "Example Corp",
        role: "Frontend Developer",
        period: "Jan 2022 - Present",
        description: "Developed and maintained web applications using React and TypeScript.",
    },
    {
        company: "Tech Solutions",
        role: "Software Engineer",
        period: "Jun 2020 - Dec 2021",
        description: "Worked on scalable backend services and RESTful APIs.",
    },
];

const Experience: React.FC = () => {
    const { t } = useTranslation("home", {
        keyPrefix: "content.experience"
    });
    return (
        <section>
            <h2>{t("heading")}</h2>
            <ul>
                {experiences.map((exp, idx) => (
                    <li key={idx}>
                        <h3>{exp.role} @ {exp.company}</h3>
                        <span>{exp.period}</span>
                        <p>{exp.description}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Experience;