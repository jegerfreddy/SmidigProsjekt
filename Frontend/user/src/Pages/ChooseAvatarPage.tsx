import React from 'react';
import AvatarList from '../assets/Avatar/AvatarList';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChooseAvatarPage: React.FC = () => {
    return (
        <div className='d-flex flex-column align-items-center min-vh-100'>
            <section className='text-center mt-5 mb-5 p-4'>
                <h1 className='display-4'>Velg din avatar</h1>
            </section>

            <section className='container'>
                <AvatarList />
            </section>

            <div className='position-absolute bottom-0 start-50 translate-middle m-3'>
                <button className='pinButton' onClick={() => window.location.href = '/gameLobby'}>Fortsett</button>
            </div>
        </div>
    );
};

export default ChooseAvatarPage;
