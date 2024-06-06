import { FC, useContext } from "react"
import { IActItem } from "../../Interfaces/IActItem"
import { Link } from "react-router-dom";
import { AdminContext } from "../../Context/AdminContext";
import { IAdminContext } from "../../Interfaces/IAdminContext";

const ActItem : FC<IActItem> = ({actID, actName}) => {

    const { events } = useContext(AdminContext) as IAdminContext;

    const selectedActEvents = events.filter((event) => {
        if (event.actID == actID) {
            return event;
        }
    });

    return (
        <>
            <div className="row p-4 d-flex align-items-center justify-content-center">
                <div className="act-item col-5">
                    <h1 className="pl-3 pr-5">{actName}</h1>

                    <div className="m-3">
                        <p>Num of Events: {selectedActEvents.length}</p>
                        <p>ID: {actID}</p>
                    </div>

                    <div>
                        <Link to={"/userserver"} state={actID}>
                        <button className="m-3 btn btn-primary">Start Act</button>
                        </Link>
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