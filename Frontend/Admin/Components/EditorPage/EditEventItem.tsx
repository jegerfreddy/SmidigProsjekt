import { FC, useState } from "react";
import {IEventItem} from "../../Interfaces/IEventItem";
import InputItem from "../../Components/EditorPage/InputItem";

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

    const printOptional = () => {
        if (option3 && option4) {
            return (
                <>
                    <InputItem name="input-3" defaultValue={option3} onChange={(e) => {handleChange(e.target)}} />
                    <InputItem name="input-4" defaultValue={option4} onChange={(e) => {handleChange(e.target)}} />
                </>
            
            );
        } else if (option3) {

            return (
                <InputItem name="input-3" defaultValue={option3} onChange={(e) => {handleChange(e.target)}} />
            );
    
        };
    };

    return (
        <div className="row d-flex align-items-center justify-content-center">

            <div className="edit-act-item col-6">

                <div className="d-flex flex-column align-items-center justify-content-center border border-dark rounded m-4 p-2">
                    <span className="p-3 d-flex flex-column align-items-center">
                        <h3 className="">
                            Event Title | Index: 
                            <input onChange={(e) => {handleChange(e.target)}} className="index-input edit-input" name="input-index" type="text" defaultValue={eventIndex} />

                        </h3>
                        <input onChange={(e) => {handleChange(e.target)}} className="edit-input" name="input-title" type="text" defaultValue={eventTitle} />
                    </span>

                    <span className="p-3">
                        <input onChange={(e) => {handleChange(e.target)}} className="edit-input" name="input-1" type="text" defaultValue={option1} />
                        <input onChange={(e) => {handleChange(e.target)}} className="edit-input" name="input-2" type="text" defaultValue={option2} />
                    </span>

                    <span className="p-3">

                        {printOptional()}

                    </span>

                </div>

                <div className="d-flex flex-column align-items-center">
                    <button className="btn btn-success w-25" onClick={handleSave}>Save</button>
                </div>
                
            </div>

        </div>
    );
}

export default EditEventItem;