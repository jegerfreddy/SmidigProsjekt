import React from 'react';
import AvatarList from '../assets/Avatar/AvatarList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NextBtn } from '../assets/Button/NextBtn';

const ChooseAvatarPage: React.FC = (username) => {
    console.log(username);

    return (
        <div className='d-flex flex-column align-items-center min-vh-100'>
            <section className='text-center mt-5 mb-5 p-4'>
                <h1 className='display-4'>Velg din avatar</h1>
            </section>

            <section className='container'>
                <AvatarList />
            </section>

            <NextBtn path='gameLobby' />
        </div>
    );
};

export default ChooseAvatarPage;
