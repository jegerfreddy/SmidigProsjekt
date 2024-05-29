import React from 'react';
import { NextBtn } from '../assets/Button/NextBtn';


const GameLobby: React.FC = () => {
    return (
        <div>
            <h1 className=''>waiting</h1>
            <NextBtn path='voting' />
        </div>
    );
};

export default GameLobby;