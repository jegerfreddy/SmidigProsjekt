import {IActItem} from "./IActItem";
import {IEventItem} from "./IEventItem";

export interface IMonitorContext {
    act: IActItem | undefined;
    currentEvent: IEventItem | undefined;
}