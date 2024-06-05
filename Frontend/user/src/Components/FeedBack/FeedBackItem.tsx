import React, { useState } from "react";
import { FeedBackItemProps } from "../../Interfaces/IFeedBack";

const FeedBackItem: React.FC<FeedBackItemProps> = ({onClick, orientation}) => {
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [rating] = useState<number>(0);

    const handleMouseOver = (value: number) => {
        setHoverRating(value);
    };

    const handleMouseOut = () => {
        setHoverRating(null);
    };

    return (
        <main className={`feedback-item ${orientation}`}>
            <div className="text-center ">
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
            </div>
        </main>
    );
}

export default FeedBackItem; 