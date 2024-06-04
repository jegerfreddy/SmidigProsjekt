import React from 'react';

const ChooseUserNamePage: React.FC = () => {
    const [username, setUsername] = React.useState('');

    const createUserName = () => {
        localStorage.setItem('username', username);
        window.location.href = `/avatar`


    };

    return (
        <div className='position-relative vh-100 bgColor'>
            <h1 className='position-absolute top-0 start-50 translate-middle-x mt-4'>
                Registrering
            </h1>

            <div className='position-absolute top-50 start-50 translate-middle'>
                <input 
                    type="text" 
                    placeholder='Brukernavn'
                    className='userNameInput'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className='position-absolute bottom-0 start-50 translate-middle-x mb-4'>
                <button className='pinButton' onClick={createUserName}>
                    Fortsett
                </button>
            </div>
        </div>
    );
};

export default ChooseUserNamePage;
