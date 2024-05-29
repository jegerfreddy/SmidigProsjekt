import React from "react";
import{ ResumeBtn } from "../assets/Button/ResumeBtn";

const TheaterPausePage: React.FC = () => {
    return (
        <main className="min-vh-100 ">
            <div className="text-center">
                <h1>Game Paused</h1>
                <ResumeBtn/>
            </div>
        </main>
    );
};

export default TheaterPausePage;
