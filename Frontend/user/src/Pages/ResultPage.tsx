import React from 'react';
import { NextBtn } from '../Components/Button/NextBtn';


const ResultPage: React.FC = () => {
    return (
        <div>
            <h1>Resultat</h1>
            {/* Add your avatar selection logic here */}
            <NextBtn path="feedBackPage" />
        </div>
    );
};

export default ResultPage;