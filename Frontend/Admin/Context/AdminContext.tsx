import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { IAdminContext } from "../Interfaces/IAdminContext.ts";
import { IActItem } from "../Interfaces/IActItem.ts";
import { IEventItem } from "../Interfaces/IEventItem.ts";
import { getActs, getEvents } from "../Services/NodeService.js";
import { updateEvent } from "../Services/NodeService.js";

export const AdminContext = createContext<IAdminContext | null>(null);

interface Props {children: ReactNode}

export const AdminProvider : FC<Props> = ({children}) => {

    // By defining the acts and events state-variables like this, we can make sure the data persists
    // through a page reload after the component has been mounted.
    const [acts, setActs] = useState<IActItem[]>( () => {
        const storedActs = localStorage.getItem("acts");
        return storedActs ? JSON.parse(storedActs) : [];
    });
    const [events, setEvents] = useState<IEventItem[]>( () => {
        const storedEvents = localStorage.getItem("events");
        return storedEvents ? JSON.parse(storedEvents) : [];
    });



    // Fetches the data when the component mounts.
    useEffect(() => {
        (async () => {
            try {

                await fetchData();
    
            } catch (error) {
                
                console.log("Error fetching data\n", error);
                
            };
        })() 
    }, []);

    //
    // Functions 
    //

    const fetchData = async () => {

        await getActs()
            .then((acts: IActItem[]) => {
                setActs(acts);
                // Here we store the data in localstorage so that the state-variables can
                // access them after the components has been mounted.
                localStorage.setItem('acts', JSON.stringify(acts));
            });

        
        await getEvents()
            .then((events: IEventItem[]) => {
                setEvents(events);
                localStorage.setItem('events', JSON.stringify(events));
            });
        
    };

    const postUpdateEvent = async (updatedEvent: IEventItem) => {

        await updateEvent(updatedEvent);
        await fetchData()
            .then(() => {
                
                window.location.reload(); // Reloads the page so the updated data is loaded into the frontend.  

            });
    };

    return (
        <>
            <AdminContext.Provider value={{
                acts, events, postUpdateEvent, fetchData
            }}>

                {children}

            </AdminContext.Provider>
        </>
    );
}