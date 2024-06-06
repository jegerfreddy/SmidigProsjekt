import {useState } from "react";
import FeedBackItem from "./FeedBackItem";
import { FeedBackListProps as Props } from "../../Interfaces/IFeedBack";


const FeedBackList: React.FC<Props> = ({onClick, orientation }) => {
    const [error] = useState<string | null>(null);


    return (
        <div className="container">
            <FeedBackItem onClick={onClick} orientation={orientation}/>
            {error && <div>{error}</div>}
        </div>
    );
}
export interface FeedBackListProps {
    onClick: () => void;
    orientation: string;
}

    export default FeedBackList;