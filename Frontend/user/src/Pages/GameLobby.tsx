import React, { useEffect, useState } from 'react';
import { NextBtn } from '../assets/Button/NextBtn';
import PhoneInfo from '../assets/Phone/PhoneInfo';

const GameLobby: React.FC = () => {
    const { orientation } = PhoneInfo();

    const imageStyle = {
        width: '100px', // Adjust the width as needed
        height: 'auto', // Maintain aspect ratio
    };

    return (
        <div className='text-center vh-100 d-flex flex-column justify-content-center position-relative'>
        <div className='position-absolute top-0 start-50 translate-middle-x mt-5'>
                <img src="images/Loading.png" alt="Loading" />
        </div>            
            <div className='display-4 text-center text-wrap mb-5'>Gjør dere klare for nå begynner eventyret!</div>
            <NextBtn path='voting' />
            {orientation === 'horizontal' ? (
                <img 
                    className='rotate-20 overflow-hidden position-absolute' 
                    src='/images/pølse.png' 
                    alt="pølse-bilde" 
                    style={{ ...imageStyle, top: '300px', right: '1px' }}/>
            ) : (
                <img 
                    className='rotate-right overflow-hidden position-absolute' 
                    src='/images/pølse.png' 
                    alt="pølse-bilde" 
                    style={{ ...imageStyle, top: '805px', }} />
            )}
        </div>
    );
};

export default GameLobby;
