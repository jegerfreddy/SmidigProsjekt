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