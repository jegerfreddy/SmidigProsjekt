export interface IAct {
    ACT_ID: number;
    ACT_NAME: string;
}

export interface IActEvent {
    ACTEVENT_ID: number;
    EVENT_TITLE: string;
    OPTION_1: string;
    OPTION_2: string;
    OPTION_3?: string;
    OPTION_4?: string;
    ACT_ID: number;
}

export interface IActEventItemProps {
    id: number;
    ACTEVENT_ID: number;
    option: string;
}

export interface IActEventListProps {
    options?: IActEventItemProps[];
}
