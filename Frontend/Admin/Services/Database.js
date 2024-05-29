import axios from "axios";

export const getActs = async () => {

    const res = await axios.get("http://localhost:8080/api/act/all")
    return res.data;
    
}