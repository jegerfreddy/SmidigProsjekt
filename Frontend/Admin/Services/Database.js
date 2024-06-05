import axios from "axios";

export const getActs = async () => {

    const res = await axios.get("http://localhost:4000/api/getActs")
    return res.data;
    
};

export const getEvents = async () => {

    const res = await axios.get("http://localhost:4000/api/getEvents")
    return res.data;
    
};

export const updateEvent = async (event) => {

    await axios.post("http://localhost:4000/api/updateEvent", event)
     

};

export const createAct = async (actName, events) => {
    
    let newActId;

    const data = {
        actName: actName
    }

    // Post a new act, returns new act ID
    await axios.post("http://localhost:8080/api/act/new", data)
        .then( async (res) => {
            newActId = res.data.actID;

            // Loop for creating new events, returns new event ID
            for (let i = 0; i < events.length; i++) {
                await axios.post(`http://localhost:8080/api/actEvent/new/link/${newActId}`, events[i]);
            };
        });
    ;
}