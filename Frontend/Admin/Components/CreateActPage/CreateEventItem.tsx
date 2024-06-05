import { FC } from "react";
import { ICreateEventItem } from "../../Interfaces/ICreateEventItem";

const CreateEventItem : FC<ICreateEventItem> = ({handleChange, eventTitle, option1, option2, option3, option4}) => {
    return (
        <div className="create-event-container border border-dark rounded">
            <h3>New Event</h3>
            <input name="eventTitle-input" value={eventTitle} placeholder="Event Title" className="create-event-input" onChange={(e) => {handleChange(e.target)}} type="text" />

            <input name="option-1" value={option1} placeholder="Option 1" className="create-event-input" onChange={(e) => {handleChange(e.target)}} type="text" />
            <input name="option-2" value={option2} placeholder="Option 2" className="create-event-input" onChange={(e) => {handleChange(e.target)}} type="text" />
            <input name="option-3" value={option3} placeholder="Option 3" className="create-event-input" onChange={(e) => {handleChange(e.target)}} type="text" />
            <input name="option-4" value={option4} placeholder="Option 4" className="create-event-input" onChange={(e) => {handleChange(e.target)}} type="text" />
            
        </div>
    );
}

export default CreateEventItem;