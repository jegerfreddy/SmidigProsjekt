import { FC } from "react"
import { IActItem } from "../Interfaces/IActItem"

const ActItem : FC<IActItem> = ({actID, actName}) => {

    return (
        <>
            <div className="row d-flex align-items-center">
                <div className="bg-primary rounded p-3 m-4 col-5">
                    <h1 className="pl-3 pr-5">{actName}</h1>

                    <div className="m-3">
                        <p>Num of Events: 3</p>
                        <p>ID: {actID}</p>
                    </div>

                    <button className="m-3 btn btn-dark">Start Act</button>
                    <button className="m-3 btn btn-dark">Edit Act</button>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center">
                    <h1 className="display-5">
                        *PREVIEW EVENTS*
                    </h1>
                </div>      
            </div>

            <hr />
        </>
    );
};

export default ActItem;