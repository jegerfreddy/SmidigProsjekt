import React from 'react';
import { useLocation } from 'react-router-dom';
import AvatarList from '../assets/Avatar/AvatarList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NextBtn } from '../assets/Button/NextBtn';

const ChooseAvatarPage: React.FC = () => {
    const location = useLocation();
    const { username } = location.state || {};

    return (
        <div className='position-relative d-flex flex-column align-items-center min-vh-100'>
            <section className='text-center mt-5 mb-3 p-4'>
                <h1 className='display-4'>Velg din avatar</h1>
                {username && <h2>{username}</h2>}
            </section>

            <section className='container mt-5'>
                <AvatarList />
            </section>
            <div className='mt-auto mb-4'>
                <NextBtn path='waiting' />
            </div>
        </div>
    );
};

export default ChooseAvatarPage;
