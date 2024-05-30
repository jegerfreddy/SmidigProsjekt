import React, { useState, useEffect } from "react";
import { ResumeBtn } from "../assets/Button/ResumeBtn";

const TheaterPausePage: React.FC = () => {
    const [seconds, setSeconds] = useState(10); // 15 min. setter den til 10 sek for nå. (15 x 60) for antall sekunder.

    useEffect(() => {
        if (seconds > 0) {
            const timer = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [seconds]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <main className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className="text-center">
                <h1>Game Paused</h1>
                <img src="/images/loading_logo.png" alt="Loading" className="img-fluid" />
                <div className="timer">
                    {formatTime(seconds)}
                </div>
            </div>
            {seconds === 0 && <ResumeBtn />}
        </main>
    );
};

export default TheaterPausePage;
