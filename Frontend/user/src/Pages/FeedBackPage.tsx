import { useState } from "react";
import { FeedBackService } from "../Services/GetService";
import { GeneralProvider } from "../Contexts/UserContext";
import FeedBackList from "../Components/FeedBack/FeedBackList";
import { IFeedBack } from "../Interfaces/IFeedBack";

const FeedBackPage: React.FC = () => {
    const [actEventId] = useState<string>('');
    const [rating, setRating] = useState<number>(0); 
    const [userID, setUserId] = useState<number>(1); 


        const handleClick = (value: number) => {
        setRating(value);
        setUserId(1);
        console.log(`Rating: ${value}`, `User ID: ${userID}`);
    };

    const handleSubmit = async (newFeedback: IFeedBack) => {
        try {
            const result: any = await FeedBackService.post(newFeedback);
            const postResult = result;
            console.log(`I page`, postResult);
        } catch (error) {
            console.error('Error occurred while submitting user data:', error);
        }
    };

     
    
    return (
            <main className='position-relative vh-100  bgColor'>
                <div className='position-absolute top-50 start-50 translate-middle'>
                    <FeedBackList actEventId={actEventId} onClick={handleClick} />
                    <section>
                        <button className="btn btn-primary" onClick={() => handleSubmit({ userID, rating })}>
                            Submit Feedback
                        </button>
                    </section>
                </div>
            </main>
    );
}

export default FeedBackPage;
