import axios from "axios";
import { ILoginPage } from "../Interfaces/ILoginPage.ts";
import { useState, FC } from "react";

const LoginPage : FC<ILoginPage> = ({setLoginValid}) => {

    const [inputUsername, setInputUsername] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);

    const handleLogIn = async (username: string, password: string) => {

        const data = {
            username: username,
            password: password
        }

        await axios.post("http://localhost:3000/LoginAdmin", data)
            .then((res) => {
                
                if (res.data) {
                    setLoginValid(res.data);
                } else {
                    setShowError(true);
                };
            });
        
        
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

                <div className={`${(showError ? "" : "d-none")} bg-warning border border-dark rounded m-3 p-3`}>
                    <p className="p-0 m-0 font-weight-bold">Username or Password was wrong. Please try again.</p>
                </div>

                <div className="input-field">
                    <p>Skriv inn:</p>
                    <input type="text" onChange={(e) => {handleInputChange(e.target)}} name="username-input" placeholder="Brukernavn..."/>
                    <input type="text" onChange={(e) => {handleInputChange(e.target)}} name="password-input" placeholder="Passord..." />
                </div>

                <button className="btn btn-primary w-25" onClick={ () => { handleLogIn(inputUsername, inputPassword) }}>
                    <span>LOGG INN</span>
                </button>
            </main>
        </>
    )
}

export default LoginPage;