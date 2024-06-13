import { useNavigate, useParams } from "react-router-dom";
import { IVertify } from "../../Interfaces/IVertify";
import { useContext, useEffect } from "react";
import { GeneralContext } from "../../Contexts/UserContext";
import { IGeneralContext } from "../../Interfaces/IContext";
import { VerifyService } from "../../Services/GetService";

const VertiyUserPage: React.FC = () => {
    const userContext = useContext(GeneralContext) as IGeneralContext<IVertify>;
    const navigate = useNavigate();
    const { userId, code } = useParams<{ userId: string, code: string }>();

    useEffect(() => {
        const handleSubmit = async (userId: string, code: string) => {
            try {
                const result = await VerifyService.verifyUser(userId, code);
                if (result) {
                    
                    localStorage.setItem('yourUserID', userId);
                     navigate('/Waiting');
                } else {
                    
                     navigate('/');
                }
            } catch (error) {
                console.error('Error occurred while submitting user data:', error);
                console.log('User not verified');
            }
        };

        if (userId && code) {
            handleSubmit(userId, code);
        }
    }, [userContext, navigate, userId, code]);

    return (
        <div className='position-relative userPage bgColor'>
            <h1>vertify user</h1>
        </div>
    );
};

export default VertiyUserPage;
