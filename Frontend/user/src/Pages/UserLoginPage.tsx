import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NextBtn } from '../Components/Button/NextBtn';

const UserLoginPage: React.FC = () => {
    return (
        <div className='position-relative vh-100 bgColor'>
            <div className='position-absolute top-0 end-0 m-4'>
                <img src="/images/questionmark.png" alt="?" />
            </div>

            <div className='position-absolute top-50 start-50 translate-middle'>
                <input type="text" placeholder='TAST PIN' className='pinInput' />
            </div>

            <NextBtn path='username' />
        </div>
    );
};

export default UserLoginPage;
