import {IActItem} from "./IActItem";
import {IEventItem} from "./IEventItem";

export interface IAdminContext {
    acts: IActItem[];
    events: IEventItem[];
    postUpdateEvent: (newEvent: IEventItem) =>void;
    fetchData: () => void;
    
}