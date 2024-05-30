import {IInputItem} from "../../Interfaces/IInputItem";
import { FC } from "react";

const InputItem : FC<IInputItem> = ({name, defaultValue, onChange}) => {

    return (
        <>
            <input onChange={onChange} className="edit-input" name={name} type="text" defaultValue={defaultValue} />
        </>
    );
}

export default InputItem;