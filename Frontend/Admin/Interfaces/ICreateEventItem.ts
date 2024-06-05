export interface ICreateEventItem {
    handleChange: (target: HTMLInputElement) => void;
    eventTitle: string;
    option1: string;
    option2: string | undefined;
    option3: string | undefined;
    option4: string | undefined;
}