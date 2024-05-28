import React from 'react';
import { NextBtn } from '../assets/Button/NextBtn';

const VotingPage: React.FC = () => {
    return (
        <main className='min-vh-100'>
            <h1>Voting Page</h1>
            {/* Add your voting logic and UI components here */}
            <NextBtn path='result' />
        </main>
    );
};

export default VotingPage;