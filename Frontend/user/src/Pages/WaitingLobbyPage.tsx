import React from "react";
import { ResumeBtn } from "../assets/Button/ResumeBtn";

const WaitingLobbyPage: React.FC = () => {
    return (
        <main>
            <div>
                <h1>
                    Waiting for the other players
                    <ResumeBtn/>
                </h1>
            </div>
        </main>
    )
};

export default WaitingLobbyPage;