import  {useNavigate} from "react-router-dom"; 
import { useState } from "react";
import FeedBackList from "../../Components/FeedBack/FeedBackList";
import { IFeedBack } from "../../Interfaces/IFeedBack";
import { FeedBackService } from "../../Services/GetService";


const FeedBackPage: React.FC = () => {
    const [actEventId] = useState<string>('');
    const [rating, setRating] = useState<number>(0); 
    const [userID, setUserId] = useState<number>(1); 
    const [actID, setActId] = useState<number>(1); 
    const navigate = useNavigate();


        const handleClick = (value: number) => {
        setRating(value);
        setUserId(1);
        setActId(1);
        console.log(`Rating: ${value}`, `User ID: ${userID}`, `Act ID: ${actID}`);
    };

    const handleSubmit = async (newFeedback: IFeedBack) => {
        try {
            const result: any = await FeedBackService.post(newFeedback);
            const postResult = result;
            console.log(`I page`, postResult);
            navigate("/endgame");
        } catch (error) {
            console.error('Error occurred while submitting user data:', error);
        }
    };

     
    
    return (
        <main className='feedback-page vh-100 d-flex overflow-hidden align-items-center justify-content-center bgColor'>
            <div className='feedback-content text-center'>
                <FeedBackList actEventId={actEventId} onClick={handleClick} orientation="horizontal" />
                <section className="mt-4">
                    <button className="btn btn-primary btn-lg" onClick={() => handleSubmit({ userID, rating, actID })}>
                        Submit Feedback
                    </button>
                </section>
            </div>
        </main>
    );
}

export default FeedBackPage;