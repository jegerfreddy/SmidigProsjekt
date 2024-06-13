import axios from "axios";
import { useState, FC } from "react";
import { ILoginPage } from "../Interfaces/ILoginPage.ts";
import AlertMessage from "../Components/GlobalComponents/AlertMessage.tsx";

const LoginPage : FC<ILoginPage> = ({setLoginValid}) => {

    const [inputUsername, setInputUsername] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);

    const handleLogIn = async (username: string, password: string) => {

        const data = {
            username: username,
            password: password
        }

            
        await axios.post("http://localhost:4000/api/loginAdmin", data)

            // This block of code is executed on fulfilled promise
            .then((response) => {
    
                setLoginValid(true);
                localStorage.setItem("loginId", `${response.data.toString()}`);
                localStorage.setItem("loginValid", "true");
 
            })

            // This block of code is executed on rejected promise
            .catch((response) => {

                setShowError(true)
                console.log(response);
                
            })
        ;

    };

    const handleInputChange = (target: HTMLInputElement) => {

        switch (target.name) {
            case "username-input":
                setInputUsername(target.value);
            break;

            case "password-input":
                setInputPassword(target.value);
            break;
        };
    };

    return (
        <>
            <main className="login-form">
                <h2 className="display-4">LOADING - Admin</h2>

                <hr />

                <AlertMessage 
                    display={showError ? "" : "none"}
                    message="Wrong username or password."
                    alertId={0}
                />

                <div className="input-field">
                    <p>Enter Login:</p>
                    <input autoComplete="off" type="text" onChange={(e) => {handleInputChange(e.target)}} name="username-input" placeholder="Brukernavn..."/>
                    <input autoComplete="off" type="password" onChange={(e) => {handleInputChange(e.target)}} name="password-input" placeholder="Passord..." />
                </div>

                <button className="btn btn-primary w-25" onClick={ () => { handleLogIn(inputUsername, inputPassword) }}>
                    <span>LOGIN</span>
                </button>
            </main>
        </>
    )
}

export default LoginPage; 