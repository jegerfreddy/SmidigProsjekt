import React from 'react';

const UserLoginPage: React.FC = () => {
    return (
        <main className='loginInputMain'>
            <input type="number" placeholder="Tast inn pin" className='loginInput'/>
            <div className='loginButtonContainer'>
                <input type="button" value="OPPGI PIN" id="idButton" className='loginButton' onClick={() => window.location.href = '/avatar'} />
            </div>
        </main>
    );
};

export default UserLoginPage;
