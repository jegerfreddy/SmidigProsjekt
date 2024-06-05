import React from 'react';
import PhoneInfo from "../../Components/Phone/PhoneInfo";
import "../../App.css"; // Assuming you have a separate CSS file for styles

const EndGamePage: React.FC = () => {
    const { orientation } = PhoneInfo();

    return (
        <main className={`${orientation} vh-100 bgColor`}>
            <div className="text-center">
                <img src="/images/LoadingLogo.png" alt="Loading" className="mt-5" />
            </div>
            <div className="text-center mt-5 fs-2">
                THE GAME HAS ENDED
            </div>
        </main>
    );
};

export default EndGamePage;
