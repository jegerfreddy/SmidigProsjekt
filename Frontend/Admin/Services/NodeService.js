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
export const linkEvents = async (choice) => {
    try {
        const response = await axios.put("http://localhost:4000/api/actEvent/next", {
          actEventID: choice.parentId,
          option: choice.optionId,
          nextEventID: choice.selectedEventId
        });
        return response.data;
      } catch (error) {
        console.error("Error linking events:", error);
        throw error;
      }
};

export const createAct = async (actName, events) => {
    console.log('Creating act from frontend service', actName, events);

    const data = {
        actName: actName,
        events: events
    };

    try {
        const res = await axios.post("http://localhost:4000/api/createAct", data);
        return res.data;
    } catch (error) {
        console.error('Error occurred while creating act and events:', error);
        throw new Error('Failed to create act and events');
    }
};