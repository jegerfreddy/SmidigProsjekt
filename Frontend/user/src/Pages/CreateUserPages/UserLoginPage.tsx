import { useState } from "react";
import { useNavigate } from "react-router-dom";


const UserLoginPage: React.FC = () => {
    const [pin, setPin] = useState('');
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/username/${pin}`);

    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPin(e.target.value);
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
                    className='pinInput' 
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
