import { useState } from "react";
import { createAct } from "../../Services/Database.js";
import CreateEventItem from "../CreateActPage/CreateEventItem";

const CreateActItem = () => {

    const [eventCount, setEventCount] = useState<number>(0);
    const [actName, setActName] = useState<string>("undefined");
    const [eventName, setEventName] = useState<string>("undefined");
    const [option1, setOption1] = useState<string>("undefined");
    const [option2, setOption2] = useState<string | null>("undefined");
    const [option3, setOption3] = useState<string | null>("undefined");
    const [option4, setOption4] = useState<string | null>("undefined");

    const handleChange = (target: HTMLInputElement) => {

        switch (target.name) {

            case "actName-input":
                setActName(target.value);
            break;

            case "eventName-input":
                setEventName(target.value);
            break;

            case "option-1":

            break;

            case "option-2":

            break;

            case "option-3":

            break;

            case "option-4":

            break;
        };
    };

    const handleSave = () => {

        createAct()

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
                                <img onClick={() => {eventCount > 0 ? setEventCount(value => value - 1) : eventCount}} className="count-button-left" src="/images/arrow.png" alt="" />
                                <h5 className="d-inline w-25 m-2 p-2">{eventCount}</h5>
                                <img onClick={() => {setEventCount(value => value + 1)}} className="count-button" src="/images/arrow.png" alt="" />
                            </span>
                                
                        </span>

                        <button className="w-100 m-3 btn btn-success">
                            Save
                        </button>
                    </div>

                    <div className="col-9 event-container">
                        <div className="container-fluid">
                            <div className="row d-flex align-items-center">
                                <div className="col-10">
                                    <CreateEventItem handleChange={handleChange}></CreateEventItem>
                                </div>

                                <div className="col-2 d-flex flex-column align-items-center justify-content-center">
                                    <h4 className="text-nowrap">Add Event</h4>
                                    <img className="add-event-image" src="/images/add-button.png" alt="" />
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