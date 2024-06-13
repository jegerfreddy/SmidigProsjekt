import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { IAdminContext } from "../Interfaces/IAdminContext.ts";
import { IActItem } from "../Interfaces/IActItem.ts";
import { IEventItem } from "../Interfaces/IEventItem.ts";
import { getActs, getEvents, updateEvent } from "../Services/NodeService.js";

export const AdminContext = createContext<IAdminContext | null>(null);

interface Props {
    children: ReactNode;
}

export const AdminProvider: FC<Props> = ({ children }) => {

    const [acts, setActs] = useState<IActItem[]>(() => {
        const storedActs = localStorage.getItem("acts");
        return storedActs ? JSON.parse(storedActs) : [];
    });

    const [events, setEvents] = useState<IEventItem[]>(() => {
        const storedEvents = localStorage.getItem("events");
        return storedEvents ? JSON.parse(storedEvents) : [];
    });

    useEffect(() => {
        fetchData().catch((error) => console.log("Error fetching data\n", error));
    }, []);

    const fetchData = async () => {
        try {
            const acts = await getActs();
            const events = await getEvents();
            
            setActs(acts);
            setEvents(events);

            localStorage.removeItem("acts");
            localStorage.removeItem("events");

            localStorage.setItem("acts", JSON.stringify(acts));
            localStorage.setItem("events", JSON.stringify(events));

        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    const postUpdateEvent = async (updatedEvent: IEventItem) => {
        try {
            await updateEvent(updatedEvent);
            await fetchData(); 
        } catch (error) {
            console.error("Failed to update event:", error);
        }
    };

    return (
        <AdminContext.Provider
            value={{
                acts,
                events,
                postUpdateEvent,
                fetchData,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
