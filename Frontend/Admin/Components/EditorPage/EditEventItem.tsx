import { FC, useContext, useState } from "react";
import { IEventItem } from "../../Interfaces/IEventItem";
import InputItem from "../../Components/EditorPage/InputItem";
import { AdminContext } from "../../Context/AdminContext";
import { IAdminContext } from "../../Interfaces/IAdminContext";

const EditEventItem : FC<IEventItem> = ({acteventID, actID, eventIndex, eventTitle, option1, option2, option3, option4}) => {

    const {postUpdateEvent} = useContext(AdminContext) as IAdminContext;

    const [newTitle, setNewTitle] = useState<string>(eventTitle ? eventTitle : "undefined");
    const [newIndex, setNewIndex] = useState<number>(eventIndex ? eventIndex : 0);
    const [alt1, setAlt1] = useState<string>(option1 ? option1 : "undefined");
    const [alt2, setAlt2] = useState<string>(option2 ? option2 : "undefined");
    const [alt3, setAlt3] = useState<string | undefined>(option3 ? option3 : "undefined");
    const [alt4, setAlt4] = useState<string | undefined>(option4 ? option4 : "undefined");

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

                if (typeof parseInt(target.value) == typeof 1) {
                    
                    setNewIndex(parseInt(target.value));

                };
                
            break;
        };
    };

    const handleSave = () => {

        const newEvent: IEventItem = {
            acteventID: acteventID,
            actID: actID,
            eventIndex: newIndex,
            eventTitle: newTitle,
            option1: alt1,
            option2: alt2,
            option3: alt3,
            option4: alt4
        };
        
        postUpdateEvent(newEvent);

    };

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

            <span className="">
                <strong>Index:</strong><input onChange={(e) => {handleChange(e.target)}} className="index-input edit-input" name="input-index" type="text" defaultValue={eventIndex} />
            </span>

                <div className="d-flex flex-column align-items-center justify-content-center rounded m-4 p-2">
                    <span className="p-3 d-flex flex-column align-items-center">
                        <h3 className="">
                            Handlings Tittel
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

                    <div className="d-flex flex-column align-items-center w-75">
                        <button className="btn btn-success w-25 save-button" onClick={handleSave}>Save</button>
                    </div>
                </div>

                
            </div>

        </div>
    );
}

export default EditEventItem;