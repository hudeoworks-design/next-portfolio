'use client';

import React, { useRef, useEffect } from "react";

const STAR_COUNT = 150;
const STAR_COLOR = "#fff";
const STAR_SIZE = 1.2;
const STAR_SPEED = 0.15;

type Star = {
    x: number;
    y: number;
    z: number;
};

function randomStar(width: number, height: number): Star {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * width,
    };
}

const StarsCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(1);
    const stars = useRef<Star[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Initialize stars
        stars.current = Array.from({ length: STAR_COUNT }, () =>
            randomStar(width, height)
        );

        function draw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            for (const star of stars.current) {
                star.z -= STAR_SPEED;
                if (star.z <= 0) {
                    Object.assign(star, randomStar(width, height));
                    star.z = width;
                }

                const k = 128.0 / star.z;
                const sx = star.x * k + width / 2;
                const sy = star.y * k + height / 2;

                if (sx < 0 || sx >= width || sy < 0 || sy >= height) continue;

                const size = STAR_SIZE * (1 - star.z / width);
                ctx.beginPath();
                ctx.arc(sx, sy, size, 0, 2 * Math.PI);
                ctx.fillStyle = STAR_COLOR;
                ctx.globalAlpha = 0.8;
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            animationRef.current = requestAnimationFrame(draw);
        }

        draw();

        function handleResize() {
            width = window.innerWidth;
            height = window.innerHeight;
            if (!canvas) return;
            canvas.width = width;
            canvas.height = height;
            stars.current = Array.from({ length: STAR_COUNT }, () =>
                randomStar(width, height)
            );
        }

        window.addEventListener("resize", handleResize);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                pointerEvents: "none",
            }}
        />
    );
};

export default StarsCanvas;