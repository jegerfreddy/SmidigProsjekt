import { FC } from "react"
import { IActItem } from "../../Interfaces/IActItem"
import { Link } from "react-router-dom";

const ActItem : FC<IActItem> = ({actID, actName}) => {

    return (
        <>
            <div className="row p-4 d-flex align-items-center justify-content-center">
                <div className="act-item col-5">
                    <h1 className="pl-3 pr-5">{actName}</h1>

                    <div className="m-3">
                        <p>Num of Events: 3</p>
                        <p>ID: {actID}</p>
                    </div>

                    <div>
                        <button className="m-3 btn btn-primary">Start Act</button>
                        <Link to={"/edit"} state={actID}>
                            <button className="m-3 btn btn-primary">Edit Act</button>
                        </Link>
                    </div>
                </div>
                <div className="col-6 act-item d-flex align-items-center justify-content-center">
                    <h1 className="display-5">
                        *PREVIEW EVENTS*
                    </h1>
                </div>  

            </div>
        </>
    );
};

export default ActItem;