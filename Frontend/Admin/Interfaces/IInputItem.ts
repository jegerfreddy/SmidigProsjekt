export interface IInputItem {
    name: string;
    defaultValue: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}