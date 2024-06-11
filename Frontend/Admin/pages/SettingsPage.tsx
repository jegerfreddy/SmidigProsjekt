import { useState } from "react";
import axios from "axios";
import PageHeader from "../Components/GlobalComponents/PageHeader";

const SettingsPage = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [userExists, setUserExists] = useState<boolean>(false);

    let timeout: number;

    const handleChange = (target: HTMLInputElement) => {

        switch (target.name) {
            case "username-input":

                // Clears the timeout while the user is still typing so that we dont send
                // value.length amount of axios calls.
                clearTimeout(timeout);
            
                if (target.value != "") {

                    // This timeout waits for 1,5 seconds after a username has been entered
                    // before it checks if its valid.
                    timeout = setTimeout( async () => {
                        await axios.get(`http://localhost:8080/api/adminUser/checkUsername/${target.value}`)
                            .then((res) => {
    
                                setUserExists(res.data);
                                console.log(res.data);
                                
    
                            });
                        ;
                    }, 1000);
                }
          
            break;

            case "password-input":
                setPassword(target.value);
            break;
        };
    };

    const addNewUser = () => {

    }

    const handleSave = () => {

    }

    return (
        <>

            <PageHeader title="Settings" underTitle="Add new admin user or change user settings."/>

            <div className="d-flex flex-column align-items-center">

                <div className="settings-content">
                    <h2>Logged in as: <i className="text-primary">admin</i></h2>

                    <div className={`${(userExists ? "" : "d-none")} bg-warning border border-dark rounded m-3 p-3`}>
                        <p className="p-0 m-0 font-weight-bold">Username already taken.</p>
                    </div>

                    <div className="d-flex flex-column align-items-center mt-3 mb-3 pt-3 pb-3 pl-5 pr-5 border border-dark rounded w-100">
                        <p> <u>Change Username & Password</u></p>
                        <input onChange={(e) => {handleChange(e.target)}} placeholder="New Username" name="username-input" type="text" />
                        <input onChange={(e) => {handleChange(e.target)}} placeholder="New Password" name="password-input" type="text" />
                        <button onClick={handleSave} className="btn btn-success w-100 m-3">Save</button>
                    </div>

                    <div className="d-flex flex-column align-items-center mt-3 mb-3 pt-3 pb-3 pl-5 pr-5 border border-dark rounded w-100">
                        <p> <u>New Admin</u></p>
                        <input onChange={(e) => {handleChange(e.target)}} placeholder="Username" name="username-input" type="text" />
                        <input onChange={(e) => {handleChange(e.target)}} placeholder="Password" name="password-input" type="password" />
                        <input onChange={(e) => {handleChange(e.target)}} placeholder="Confirm Password" name="password-input" type="password" />
                        <button onClick={addNewUser} className="btn btn-primary w-75 m-3">Add New Admin</button>
                    </div>

                    

                    
                </div>

            </div>
        </>
    );
};

export default SettingsPage;