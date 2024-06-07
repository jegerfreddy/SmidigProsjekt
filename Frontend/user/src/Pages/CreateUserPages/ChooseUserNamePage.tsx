import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ChooseUserNamePage: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const { code } = useParams<{ code: string }>();

    const createUserName = () => {
        if (username.length > 0) {
            navigate(`/avatar/${username}/${code}`);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 15) {
            setUsername(value);
        }
    };

    return (
        <div className='position-relative userPage bgColor'>
            <h1 className='position-absolute top-0 start-50 translate-middle-x mt-4'>
                Registrering
            </h1>

            <div className='position-absolute top-50 start-50 translate-middle'>
                <input 
                    type="text" 
                    placeholder='Brukernavn'
                    className='userInput'
                    value={username}
                    onChange={handleInputChange}
                    maxLength={15} // Restrict input to 15 characters
                />
            </div>

            <div className='position-absolute bottom-0 start-50 translate-middle-x mb-4'>
                <button 
                    className={`pinButton ${username.length > 0 ? 'enabled' : 'disabled'}`}
                    onClick={createUserName}
                    disabled={username.length === 0} // Disable button if username is empty
                >
                    Fortsett
                </button>
            </div>
        </div>
    );
};

export default ChooseUserNamePage;
