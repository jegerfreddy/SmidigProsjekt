import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { IMonitorContext } from "../interfaces/IMonitorContext.ts";
import { IActItem } from "../interfaces/IActItem.ts";
import { IEventItem } from "../interfaces/IEventItem.ts";
import { connect, getData } from "../services/WebsocketService.js";
import {} from "axios";

export const MonitorContext = createContext<IMonitorContext | null>(null);

interface Props {children: ReactNode}

export const MonitorProvider : FC<Props> = ({children}) => {

    const [act, setAct] = useState<IActItem>({actName: "test", actID: 1})
    const [events, setEvents] = useState<IEventItem[]>([]);

    const [currentEvent, setCurrentEvent] = useState<IEventItem>();

    useEffect(() => {

        connect();
        const data = getData();

        //setAct(data.act.data);
        //setEvents(data.events.data);
    });

    return (
        <>
            <MonitorContext.Provider value={{act, currentEvent}}>

                {children}

            </MonitorContext.Provider>
        </>
    );
}