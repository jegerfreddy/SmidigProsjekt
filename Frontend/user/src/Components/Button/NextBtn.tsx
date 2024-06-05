import React from 'react';
import { NextBtnProps } from '../../Interfaces/IButton';
import { useNavigate } from 'react-router-dom';

export const NextBtn: React.FC<NextBtnProps> = ({ path }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className='d-flex justify-content-center align-items-center position-absolute bottom-0 start-50 translate-middle-x mb-4'>
                <button className='pinButton' onClick={() => navigate(`/${path}`)}>
                    Fortsett
                </button>
            </div>
        </>
    );
};