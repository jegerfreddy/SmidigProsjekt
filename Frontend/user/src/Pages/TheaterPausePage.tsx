import React from "react";
import { ResumeBtn } from "../assets/Button/ResumeBtn";

const TheaterPausePage: React.FC = () => {
    return (
        <main className="min-vh-100 d-flex flex-column">
            <div className="text-center">
                <h1>Game Paused</h1>
                <img src="/images/loading_logo.png" alt="Loading" className="img-fluid" />
            </div>
            <ResumeBtn />
        </main>
    );
};

export default TheaterPausePage;
