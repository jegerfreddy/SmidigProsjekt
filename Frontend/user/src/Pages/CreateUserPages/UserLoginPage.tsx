import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLoginPage: React.FC = () => {
    const [pin, setPin] = useState('');
    const navigate = useNavigate();

    const handleClick = () => {
        if (pin.length === 6) {
            navigate(`/username/${pin}`);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 6) {
            setPin(value);
        }
    };

    return (
        <div className='position-relative userPage bgColor'>
            <div className='position-absolute top-0 end-0 m-4'>
                <img src="/images/questionmark.png" alt="?" />
            </div>

            <div className='position-absolute top-50 start-50 translate-middle'>
                <input 
                    type="text" 
                    placeholder='TAST PIN - xxxxxx' 
                    className='userInput' 
                    value={pin} 
                    onChange={handleInputChange}
                    maxLength={6} 
                />
            </div>

            <div className='position-absolute bottom-0 start-50 translate-middle-x mb-4'>
                <button 
                    className={`pinButton ${pin.length === 6 ? 'enabled' : 'disabled'}`} 
                    onClick={handleClick}
                    disabled={pin.length !== 6} 
                >
                    Fortsett
                </button>
            </div>
        </div>
    );
};

export default UserLoginPage;
