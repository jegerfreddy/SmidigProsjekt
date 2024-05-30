import React, { useState, useEffect } from "react";
import { ResumeBtn } from "../assets/Button/ResumeBtn";
import "../App.css"; // Ensure this line imports your CSS

const WaitingLobbyPage: React.FC = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const movingDots = ['','.', '..', '...', '....'];
        let index = 0;
        const interval = setInterval(() => {
            setDots(movingDots[index]);
            index = (index + 1) % movingDots.length;
        }, 500); // Update every 500ms

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <main>
            <div>
                <div className="Cloud1"></div> {/* Corrected className */}
                <h1 className="text-center">
                    <div>Waiting for</div>
                    <div>players{dots}</div>
                    <ResumeBtn />
                </h1>
            </div>
        </main>
    );
};

export default WaitingLobbyPage;
