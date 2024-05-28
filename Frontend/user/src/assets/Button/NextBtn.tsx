import React from 'react';
import { NextBtnProps } from '../../Interfaces/IButton';

export const NextBtn: React.FC<NextBtnProps> = ({ path }) => {
    return (
        <>
            <div className='position-absolute bottom-0 start-50 translate-middle m-3'>
                <button className='pinButton' onClick={() => window.location.href = `/${path}`}>
                    Fortsett
                </button>
            </div>
        </>
    );
};