import React, { useState, useEffect } from "react";
import { NextBtn } from '../assets/Button/NextBtn';


const StandByPage: React.FC = () => {

    return (
        <main className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
            <div className="text-center justify-content-center position relative"> Følg med på teaterstykket</div>
            <img className="img-fluid position absolute" src="images/pølse.png" alt="Pølse-bilde" />
            <NextBtn path='voting'/>
        </main>
    )
};

export default StandByPage;