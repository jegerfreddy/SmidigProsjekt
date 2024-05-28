import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserLoginPage: React.FC = () => {
    return (
        <div className='position-relative vh-100'>
            <div className='position-absolute top-0 end-0 m-4'>
                <img src="/images/questionmark.png" alt="?" />
            </div>

            <div className='position-absolute top-50 start-50 translate-middle'>
                <input type="text" placeholder='TAST PIN' className='pinInput' />
            </div>

            <div className='position-absolute bottom-0 start-50 translate-middle m-3'>
                <button className='pinButton' onClick={() => window.location.href = '/avatar'}>OPPGI PIN</button>
            </div>
        </div>
    );
};

export default UserLoginPage;
