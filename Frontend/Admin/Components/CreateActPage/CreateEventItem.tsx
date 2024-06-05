import { FC } from "react";
import { ICreateEventItem } from "../../Interfaces/ICreateEventItem";

const CreateEventItem : FC<ICreateEventItem> = ({handleChange}) => {
    return (
        <div className="create-event-container border border-dark rounded">
            <h3>New Event</h3>
            <input placeholder="Event Title" className="create-event-input" onChange={(e) => {handleChange(e.target)}} type="text" />

            <input placeholder="Option 1" className="create-event-input" type="text" />
            <input placeholder="Option 2" className="create-event-input" type="text" />
            <input placeholder="Option 3" className="create-event-input" type="text" />
            <input placeholder="Option 4" className="create-event-input" type="text" />
            
        </div>
    );
}

export default CreateEventItem;