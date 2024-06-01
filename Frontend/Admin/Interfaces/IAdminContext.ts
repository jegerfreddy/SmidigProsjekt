import {IActItem} from "./IActItem";
import {IEventItem} from "./IEventItem";

export interface IAdminContext {
    acts: IActItem[];
    events: IEventItem[];
    postUpdateEvent: (newEvent: IEventItem) =>void;
    // startAct: (actID: number) => 200;
}