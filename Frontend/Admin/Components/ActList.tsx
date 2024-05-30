import { useContext } from "react";
import { IAdminContext } from "../Interfaces/IAdminContext";
import { AdminContext } from "../Context/AdminContext";
import ActItem from "../Components/ActItem";

const ActList = () => {

    const {acts} = useContext(AdminContext) as IAdminContext;

    const getActsJSX = () => {
        const actsJSX = acts.map((act, i) => {
            
            return (
                <ActItem
                    key={i}
                    actID={act.actID}
                    actName={act.actName}
                ></ActItem>

            );
        })

        return actsJSX;
    };
    return (

        <div className="container-fluid">
            
            {getActsJSX()}

        </div>
    )
}

export default ActList;