import React, { useState } from "react";
import { FeedBackItemProps } from "../../Interfaces/IFeedBack";

const FeedBackItem: React.FC<FeedBackItemProps> = ({onClick}) => {
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [rating, setRating] = useState<number>(0);

    const handleMouseOver = (value: number) => {
        setHoverRating(value);
    };

    const handleMouseOut = () => {
        setHoverRating(null);
    };

    return (
        <main className="vh-100 bgColor">
            <div className="container text-center">
                <h1>Gi oss din tilbakemelding!</h1>
                <div className="stars my-4">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <span
                            key={value}
                            className={`star ${value <= (hoverRating || rating) ? 'active' : ''}`}
                            data-value={value}
                            onClick={() => onClick(value)}                            
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
}

export default FeedBackItem;