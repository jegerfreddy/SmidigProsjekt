import { Dispatch, SetStateAction } from "react";

export interface ILoginPage {
    setLoginValid: Dispatch<SetStateAction<boolean>>;
}