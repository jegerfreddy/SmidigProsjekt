import axios from "axios";

const actEndpoint = "http://localhost:8080/api/act/id/";
const eventsEndpoint = "http://localhost:8080/api/actEvent/act/";

export const fetchData = async (id) => {

    const act = await axios.get(actEndpoint + id);
    const events = await axios.get(eventsEndpoint + id);

    return {act, events}

};