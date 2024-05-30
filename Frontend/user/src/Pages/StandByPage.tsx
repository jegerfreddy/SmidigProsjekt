import React, { useState, useEffect } from "react";
import { NextBtn } from '../assets/Button/NextBtn';


const StandByPage: React.FC = () => {

    return (
        <main>
            <div className="text-center justify-content-center"> Følg med på teaterstykket</div>
            <img className="img-fluid" src="images/pølse.png" alt="Pølse-bilde" />
            <NextBtn path='voting'/>
        </main>
    )
};

export default StandByPage;