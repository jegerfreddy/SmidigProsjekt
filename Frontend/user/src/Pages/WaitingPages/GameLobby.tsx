import React, { useEffect, useState } from 'react';
import { NextBtn } from '../../Components/Button/NextBtn';
import LoadingComponent from '../../Components/Header/LoadingCircle';
import PhoneInfo from '../../Components/Phone/PhoneInfo';


const GameLobby: React.FC = () => {
    const { orientation } = PhoneInfo();

    const imageStyle = {
        width: '100px', 
        height: 'auto', 
    };

    return (

        <div className='text-center userPage d-flex flex-column justify-content-center position-relative overflow-hidden bgColor'>
                
                <LoadingComponent/> 
                          
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
