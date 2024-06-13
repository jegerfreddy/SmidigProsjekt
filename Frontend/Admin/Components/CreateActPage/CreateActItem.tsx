import { useContext, useState } from "react";
import { createAct } from "../../Services/NodeService.js";
import CreateEventItem from "../CreateActPage/CreateEventItem";
import { AdminContext } from "../../Context/AdminContext.js";
import { IAdminContext } from "../../Interfaces/IAdminContext.js";
import { useNavigate } from "react-router-dom";

const CreateActItem = () => {

    
    
    interface ITempEvent {
        eventIndex: number,
        eventTitle: string | undefined,
        option1: string | undefined,
        option2: string | undefined,
        option3: string | undefined,
        option4: string | undefined
    }

    const { fetchData } = useContext(AdminContext) as IAdminContext

    const navigate = useNavigate();
    
    const [newEvents, setNewEvents] = useState<ITempEvent[]>([]);
    const [eventCount, setEventCount] = useState<number>(0);

    const [actName, setActName] = useState<string>("undefined");

    const [eventIndex, setEventIndex] = useState<number>(1);
    const [eventTitle, setEventTitle] = useState<string>("");
    const [option1, setOption1] = useState<string>("");
    const [option2, setOption2] = useState<string>("");
    const [option3, setOption3] = useState<string>("");
    const [option4, setOption4] = useState<string>("");    

    const handleChange = (target: HTMLInputElement) => {

        switch (target.name) {

            case "actName-input":
                setActName(target.value);
            break;

            case "eventTitle-input":
                setEventTitle(target.value);
            break;

            case "option-1":
                setOption1(target.value);
            break;

            case "option-2":
                setOption2(target.value);
            break;

            case "option-3":
                setOption3(target.value);
            break;

            case "option-4":
                setOption4(target.value);
            break;
        };

    };

    const addNewEvent = () => {

        const event: ITempEvent = {
            eventIndex: eventIndex,
            eventTitle: eventTitle,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4
        }
        
        setNewEvents([...newEvents, event])
        setEventCount(prev => prev + 1);

        setEventIndex(value => value + 1);
        setEventTitle("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");

        
        localStorage.setItem("tempNewEvents", JSON.stringify(newEvents))
    
    };

    const handleSave = () => {
        createAct(actName, newEvents);
        localStorage.removeItem("tempNewEvents");
        fetchData();
        navigate("/");
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row create-act-content">
                    
                    <div className="col-3 bg-primary p-3 d-flex flex-column justify-content-start align-items-center">

                        <span className="w-100 d-flex justify-content-center align-items-center border-bottom border-dark p-2 mb-4">
                            <h2>Settings</h2>
                        </span>

                        <span className="w-100 d-flex flex-column justify-content-center align-items-center border border-dark p-3 m-2 rounded">
                            <h5>Act Name</h5>
                            <input className="create-input" name="actName-input" onChange={(e) => {handleChange(e.target)}} type="text" />
                        </span>

                        <span className="w-100 d-flex flex-column justify-content-center align-items-center border border-dark p-3 m-2 rounded">
                            <h5>Number of events</h5>
                            
                            <span>
                                <h5 className="d-inline w-25 m-2 p-2">{eventCount}</h5>
                            </span>
                                
                        </span>

                        <button onClick={handleSave} className="w-100 m-3 btn btn-success">
                            Save
                        </button>
                    </div>

                    <div className="col-9 event-container">
                        <div className="container-fluid">
                            <div className="row d-flex align-items-center">
                                <div className="col-12">
                                    <CreateEventItem
                                        handleChange={handleChange}
                                        eventTitle={eventTitle}
                                        option1={option1}
                                        option2={option2}
                                        option3={option3}
                                        option4={option4}
                                    ></CreateEventItem>
                                </div>

                                <div className="col-12 mt-5 d-flex flex-column align-items-center justify-content-center">
                                    <p className="text-nowrap m-0">Add Event</p>
                                    <img className="add-event-image" onClick={addNewEvent} src="/images/add-button.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default CreateActItem;