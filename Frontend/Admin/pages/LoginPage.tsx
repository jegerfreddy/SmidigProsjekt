import axios from "axios";
import { useState } from "react";

const LoginPage = () => {

    const [inputUsername, setInputUsername] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");

    const handleLogIn = async (username: string, password: string) => {

        const data = {
            username: username,
            password: password
        }

        const res = await axios.post("http://localhost:3000/LoginAdmin", data);

        if (res.data) {
            // Handle navigation to dashboard
        } else {
            // Print error message to user
        };
        
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

                <div>
                    <input type="text" onChange={(e) => {handleInputChange(e.target)}} name="username-input" placeholder="Brukernavn..."/>
                    <input type="text" onChange={(e) => {handleInputChange(e.target)}} name="password-input" placeholder="Passord..." />
                </div>

                <button className="btn btn-primary" onClick={() => {handleLogIn(inputUsername, inputPassword)}}>
                    Logg inn
                </button>
            </main>
        </>
    )
}

export default LoginPage;