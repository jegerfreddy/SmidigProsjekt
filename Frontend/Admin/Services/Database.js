import axios from "axios";

export const getActs = async () => {

    const res = await axios.get("http://localhost:3000/getActs")
    return res.data;
    
};

export const getEvents = async () => {

    const res = await axios.get("http://localhost:3000/getEvents")
    return res.data;
    
};

export const updateEvent = async (event) => {

    await axios.post("http://localhost:3000/updateEvent", event)
     

};

export const createAct = async (actName, events) => {

    const data = {
        actName: actName
    }

    let newActId;

    // Post a new act, returns new act ID
    await axios.post("endpoint")
        .then( (res) => {
            newActId = res.data.actID;
        })
    ;

    // Loop for creating new events, returns new event ID
    for (let i = 0; index < events.length; i++) {
        await axios.post(`/new/${newActId}`, events[i]);
    }

    await axios.post("endpoint", events);

}