import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChooseUserNamePage: React.FC = () => {
    const [username, setUsername] = React.useState('');
    const navigate = useNavigate();

    const createUserName = () => {
        navigate('/avatar', { state: { username } });
    };

    return (
        <main className='min-vh-100'>
            <h1 className='text-center'>Registrering</h1>
            <input 
                type="text" 
                placeholder='Brukernavn'
                className='position-absolute bottom-50 start-50 translate-middle m-3 userNameInput'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <div className='position-absolute bottom-0 start-50 translate-middle m-3'>
                <button className='pinButton' onClick={createUserName}>
                    Fortsett
                </button>
            </div>
        </main>
    );
};

export default ChooseUserNamePage;
