import React, { useEffect, useState } from 'react';
import { NextBtn } from '../assets/Button/NextBtn';
import PhoneInfo from '../assets/Phone/PhoneInfo';

const GameLobby: React.FC = () => {
    const { orientation } = PhoneInfo();

    const imageStyle = {
        width: '100px', 
        height: 'auto', 
    };

    const loadingPhotoStyle = {
        animation: 'loading-animation 2s infinite linear',
    };

    return (

        <div className='text-center vh-100 d-flex flex-column justify-content-center position-relative overflow-hidden'>
        <div className='position-absolute top-0 start-50 translate-middle-x mt-5'>
                <img id='Loading-photo' src="images/Loading.png" alt="Loading" style={loadingPhotoStyle} /> 
        </div>            
            <div className='display-4 text-center text-wrap mb-5'>Gjør dere klare for nå begynner eventyret!</div>
            <NextBtn path='standByPage' />
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
                    style={{ ...imageStyle, top: '790px', right:'350px' }} />
            )}
        </div>
    );
};

export default GameLobby;
