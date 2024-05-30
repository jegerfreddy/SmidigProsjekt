import React from 'react';
import { NextBtn } from '../assets/Button/NextBtn';


const ResultPage: React.FC = () => {
    return (
        <div>
            <h1>Result</h1>
            {/* Add your avatar selection logic here */}
            <NextBtn path="break" />
        </div>
    );
};

export default ResultPage;