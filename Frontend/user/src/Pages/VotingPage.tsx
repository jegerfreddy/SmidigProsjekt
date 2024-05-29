import React from 'react';
import { NextBtn } from '../assets/Button/NextBtn';
import VotingList from '../assets/Voting/VotingList';

const VotingPage: React.FC = () => {
    return (
        <main className='position-relative vh-100'>
            <div className='position-absolute top-0 start-50 translate-middle-x mt-5'>
                <img src="images/Loading.png" alt="Loading" />
            </div>

            <div className='position-absolute top-50 start-50 translate-middle'>
                <VotingList />
            </div>
            <div className=''>
                <NextBtn path='result' />
            </div>
        </main>
    );
};

export default VotingPage;
