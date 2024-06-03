import { useState } from "react";

const FeedBackPage: React.FC = () => {

    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    
    const handleClick = (value: number) => {
        setRating(value);
        /* saveRating(value); */
    };

    const handleMouseOver = (value: number) => {setHoverRating(value);};
    const handleMouseOut = () => {setHoverRating(0);};

/*     const saveRating = async(value:number) => {
        try {
            if ()
        } catch (error) {
            console.log('Error occured while submitting user feedback', error);
        }
    }; */


return (
        <main>
            <div className="container text-center">
                <h1>Gi oss din tilbakemelding!</h1>
                <div className="stars my-4">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <span
                            key={value}
                            className={`star ${value <= (hoverRating || rating) ? 'active' : ''}`}
                            data-value={value}
                            onClick={() => handleClick(value)}
                            onMouseOver={() => handleMouseOver(value)}
                            onMouseOut={handleMouseOut}
                            style={{ cursor: 'pointer', fontSize: '5rem', color: value <= (hoverRating || rating) ? 'gold' : '#ccc' }}
                        >
                            &#9733;
                        </span>
                    ))}
                </div>
                <div>Takk for din tilbakemelding!</div>
                {rating > 0 && <div>Du ga teateret {rating} stjerne{rating > 1 ? 'r' : ''}.</div>}
            </div>
        </main>
    );
};

export default FeedBackPage;