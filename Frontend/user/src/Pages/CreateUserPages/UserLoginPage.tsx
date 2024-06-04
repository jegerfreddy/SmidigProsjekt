import { useState } from "react";
import { useNavigate } from "react-router-dom";


const UserLoginPage: React.FC = () => {
    const [pin, setPin] = useState('');
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.setItem('code', pin);
        console.log('Stored code:', localStorage.getItem('code')); // Check the console for the stored value
        navigate('/username')
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPin(e.target.value);
        console.log('Current input value:', pin); // Check the console for the current input value
    };

    return (
        <div className='position-relative vh-100 bgColor'>
            <div className='position-absolute top-0 end-0 m-4'>
                <img src="/images/questionmark.png" alt="?" />
            </div>

            <div className='position-absolute top-50 start-50 translate-middle'>
                <input 
                    type="text" 
                    placeholder='TAST PIN' 
                    className='userInput' 
                    value={pin} 
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={handleClick}>
                fortsett knapp
            </button>

        </div>
    );
};

export default UserLoginPage;
