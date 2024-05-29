import React, { useEffect, useState } from 'react';
import { NextBtn } from '../assets/Button/NextBtn';
import PhoneInfo from '../assets/Phone/PhoneInfo';

const GameLobby: React.FC = () => {
    const { orientation } = PhoneInfo();

    return (

        <div className='text-center vh-100 d-flex flex-column justify-content-center position-relative'>
            <div className='display-4 text-center text-wrap mb-5'>Gjør dere klare for nå begynner eventyret!</div>
            <NextBtn path='voting' />
            {orientation === 'horizontal' ? (
                <img className='rotate-20 overflow-hidden position-absolute' src='/images/pølse.png' alt="pølse-bilde" style={{ bottom: '10px', right: '10px' }} />
            ) : (
                <img className='rotate-20 overflow-hidden position-absolute' src='/images/pølse.png' alt="pølse-bilde" style={{ top: '10px', right: '10px' }} />
            )}
        </div>
    );
};

export default GameLobby;
