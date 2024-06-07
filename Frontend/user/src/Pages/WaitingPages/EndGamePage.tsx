import React from 'react';
import PhoneInfo from "../../Components/Phone/PhoneInfo";
import "../../App.css"; // Assuming you have a separate CSS file for styles

const EndGamePage: React.FC = () => {
    const { orientation } = PhoneInfo();

    return (
        <main className={`${orientation} userPage bgColor`}>
            <div className="text-center">
                <h1>ENDGAME</h1>
                <img src="/images/LoadingLogo.png" alt="Loading" className="" />
            </div>
            <div className="credits-container">
                <div className="credits-text text-primary">
                    <p>Special Thanks: OBAMA</p>
                    <p>Music: 50-CENT</p>
                    <p>Designer: TEAM NEUTRON</p>
                    <p>Developer: TEAM NEUTRON</p>
                    <p>Credits: CHRISTOFFER CALANDRI</p>
                    <p>LOADING</p>
                    
                    
                    
                    
                    {/* Add more credits as needed */}
                </div>
            </div>
        </main>
    );
};

export default EndGamePage;
