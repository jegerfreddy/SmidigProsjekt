import { FC } from "react";
import { IAlertMessage } from "../../Interfaces/IAlertMessage";

const AlertMessage : FC<IAlertMessage> = ({display, message, alertId}) => {

    const AlertType = Object.freeze({
        0: "#FFBF00", // For warning messages
        1: "#83B4FF" // For notification messages
    })

    let color: string = AlertType[0];

    switch (alertId) {
        case 0: color = AlertType[0]; break;
        case 1: color = AlertType[1]; break;
    }

    return (
        <>
            <div className="alert-message" style={{backgroundColor: color, display: display}}>
                <p className="m-3 h5">{message}</p>
            </div>
        </>
    );
}

export default AlertMessage;