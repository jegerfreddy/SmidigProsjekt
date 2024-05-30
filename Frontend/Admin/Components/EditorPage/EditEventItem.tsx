import { FC, useState } from "react";
import {IEventItem} from "../../Interfaces/IEventItem";

const EditEventItem : FC<IEventItem> = ({id, actID, eventIndex, eventTitle, option1, option2, option3, option4}) => {

    const [newTitle, setNewTitle] = useState<string>(eventTitle);
    const [newIndex, setNewIndex] = useState<number>(eventIndex);
    const [alt1, setAlt1] = useState<string>(option1);
    const [alt2, setAlt2] = useState<string>(option2);
    const [alt3, setAlt3] = useState<string | undefined>(option3);
    const [alt4, setAlt4] = useState<string | undefined>(option4);

    const handleChange = (target: HTMLInputElement) => {

        switch (target.name) {
            case "input-1":
                setAlt1(target.value);
            break;

            case "input-2":
                setAlt2(target.value);
            break;

            case "input-3":
                setAlt3(target.value);
            break;

            case "input-4":
                setAlt4(target.value);
            break;

            case "input-title":
                setNewTitle(target.value);
            break;

            case "input-index":

                if (parseInt(target.value)) {
                    setNewIndex(parseInt(target.value));
                };

            break;
        };
    };

    const handleSave = () => {

        const newEvent: IEventItem = {
            id: id,
            actID: actID,
            eventIndex: newIndex,
            eventTitle: newTitle,
            option1: alt1,
            option2: alt2,
            option3: alt3,
            option4: alt4
        }
        
        console.log("Trigger save");

    }

    return (
        <div className="container-fluid d-flex flex-column align-items-center m-3">

            <div className="row bg-warning w-50 edit-event border border-dark rounded">

                <h5>Event Title</h5>
                <input type="text" defaultValue={eventTitle} />

                <hr />
                
                <button className="btn btn-dark" onClick={handleSave}>Save</button>
            </div>

        </div>
    );
}

export default EditEventItem;