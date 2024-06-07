import { useNavigate, useParams } from "react-router-dom"; 
import { useState } from "react";
import FeedBackList from "../../Components/FeedBack/FeedBackList";
import { IFeedBack } from "../../Interfaces/IFeedBack";
import { FeedBackService } from "../../Services/GetService";



const FeedBackPage: React.FC = () => {
    const [actEventId] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const userID = Number(localStorage.getItem('yourUserID') || '0');  
    const { actId } = useParams<{ actId: string }>();
    const actID = Number(actId); // Convert actId from params to a number
    const navigate = useNavigate();

    const handleClick = (value: number) => {
        setRating(value);
        console.log(`Rating: ${value}`, `User ID: ${userID}`, `Act ID: ${actID}`);
    };

    const handleSubmit = async (newFeedback: IFeedBack) => {
        try {
            const result = await FeedBackService.post(newFeedback);
            console.log(`In page`, result);
            navigate("/endgame");
        } catch (error) {
            console.error('Error occurred while submitting user data:', error);
        }
    };

    return (
        <main className='feedback-page userPage d-flex overflow-hidden align-items-center justify-content-center bgColor'>
            <div className='feedback-content text-center'>
                <FeedBackList actEventId={actEventId} onClick={handleClick} orientation="horizontal" />
                <section className="mt-4">
                    <button 
                        className={`btn btn-primary btn-lg ${rating === 0 ? 'disabled' : ''}`}
                        onClick={() => handleSubmit({ userID, rating, actID })}
                        disabled={rating === 0} // Knappen er "grå" før stjerne velges.
                    >
                        Submit Feedback
                    </button>
                </section>
            </div>
        </main>
    );
};

export default FeedBackPage;
