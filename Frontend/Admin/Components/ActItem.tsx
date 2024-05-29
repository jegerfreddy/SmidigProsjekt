import { FC } from "react"
import { IActItem } from "../Interfaces/IActItem"

const ActItem : FC<IActItem> = ({actID, actName}) => {


    return (
        <div className="bg-primary">
            <h1>Title:{actName} | ID: {actID}</h1>
        </div>
    );
}

export default ActItem;