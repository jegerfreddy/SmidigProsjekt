import {useState } from "react";
import FeedBackItem from "./FeedBackItem";
import { FeedBackListProps } from "../../Interfaces/IFeedBack";




const FeedBackList: React.FC<FeedBackListProps> = ({onClick }) => {
    const [error] = useState<string | null>(null);

    
    return (
        <div className="container">
            <FeedBackItem onClick={onClick}/>
            {error && <div>{error}</div>}
        </div>
    );
}

    export default FeedBackList;