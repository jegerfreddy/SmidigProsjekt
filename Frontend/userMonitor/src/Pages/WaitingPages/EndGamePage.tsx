import React from 'react';
import "../../App.css"; 

const EndGamePage: React.FC = () => {

    return (
        <main className={`vh-100 bgColor`}>
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
