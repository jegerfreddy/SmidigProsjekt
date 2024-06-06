import axios from "axios";
import { fetchData } from "./DatabaseService";
import { useNavigate } from "react-router-dom";

let data;

export const getData = () => { return data };

export const connect = () => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onopen = async () => {
        console.log("Connected to WebSocket");
    }

    ws.onmessage = (message) => {

        const data = message.data;

        handleMessage(data)
    };
};

const handleMessage = (data) => {

    switch (data.state) {

        case "SETUP":

            (async () => {

                await fetchData(data.actID)
                    .then((data_) => {
                        data = data_
                        useNavigate("/welcome-page")
                    })
                ;

            })()
        break;

        default:
            console.log('Unknown game state:', state);
    }
  };