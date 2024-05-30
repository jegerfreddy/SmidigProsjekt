import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { IAdminContext } from "../../Interfaces/IAdminContext.ts";
import { AdminContext } from "../../Context/AdminContext.tsx";
import EditEventItem from "./EditEventItem";

const EditEventList = () => {

    const { events } = useContext(AdminContext) as IAdminContext;

    const location = useLocation();
    const actID = location.state;

    const actEvents = events.filter((event) => {
        if (event.actID == actID) {
            return event;
        }
    });


    const getEditEventJSX = () => {
        
        const EditEventJSX = actEvents.map((event, i) => {

            return (
                <EditEventItem
                    key={i}
                    id={event.id}
                    actID={event.actID}
                    eventIndex={event.eventIndex}
                    eventTitle={event.eventTitle}
                    option1={event.option1}
                    option2={event.option2}
                    option3={event.option3}
                    option4={event.option4}
                ></EditEventItem>
            );
        });

        return EditEventJSX;
    }

    return (
        <>
            {getEditEventJSX()}
        </>
    );
}

export default EditEventList;