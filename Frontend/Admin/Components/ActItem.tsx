import { FC } from "react"
import { IActItem } from "../Interfaces/IActItem"

const ActItem : FC<IActItem> = ({actID, actName}) => {


    return (
        <div className="bg-primary rounded m-3 p-3 d-flex align-items-center">
            <h1 className="display-3">{actName}</h1>

            <div className="m-3">
                <p>Num of Events: 3</p>
                <p>Annen Data</p>
            </div>

            <button className="m-3">Start Act</button>
            <button className="m-3">Edit Act</button>
        </div>
    );
}

export default ActItem;