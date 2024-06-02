export interface IAct {
    ACT_ID: number;
    ACT_NAME: string;
}

export interface IActEvent {
    acteventID: number;
    eventId: number;
    eventTitle: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    actId: number;
}

export interface IActEventItem {
    event?: IActEvent[];
}

export interface IActEventItemProps {
    id: number;
    ACTEVENT_ID: number;
    option: string;
}

export interface IActEventListProps {
    options?: IActEventItemProps[];
}
