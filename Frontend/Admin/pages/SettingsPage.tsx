import { useState } from "react";
import axios from "axios";
import PageHeader from "../Components/GlobalComponents/PageHeader";
import { addNewAdmin, updateAdminUser } from "../Services/NodeService";
import AlertMessage from "../Components/GlobalComponents/AlertMessage";

const SettingsPage = () => {

    const [renameUser, setRenameUser] = useState<string>("");
    const [renamePass, setRenamePass] = useState<string>("");
    const [renameConfirmPass, setRenameConfirmPass] = useState<string>("");

    const [newUsername, setNewUsername] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newConfirmPassword, setNewConfirmPassword] = useState<string>("");

    const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);

    let timeout: number;

    const checkUsernamAvailable = (username: string) => {

        
        
        clearTimeout(timeout);
    
        if (username != "") {

            
            
            timeout = setTimeout( async () => {
                await axios.get(`http://localhost:4000/api/adminUser/checkUsername/${username}`)
                    .then((res) => {

                        setUsernameAvailable(res.data);
                        
                    })
                ;
            }, 1000);
        };
    };

    const handleChange = (target: HTMLInputElement) => {

        switch (target.name) {
            case "rename-user":

                checkUsernamAvailable(target.value);
                setRenameUser(target.value);
          
            break;

            case "rename-password":

                setRenamePass(target.value);
        
            break;

            case "rename-confirm-password":

                setRenameConfirmPass(target.value);
        
            break;

            case "new-username":

                checkUsernamAvailable(target.value);
                setNewUsername(target.value);

            break;

            case "new-password":

                setNewPassword(target.value);

            break;

            case "new-confirm-password":

                setNewConfirmPassword(target.value);

            break;
        };
    };

    const addNewUser = () => {

        if (usernameAvailable && (newPassword == newConfirmPassword)) {

            const newAdmin = {
                username: newUsername,
                password: newPassword
            };
    
            addNewAdmin(newAdmin);
        };
    };

    const handleSave = () => {

        if (usernameAvailable && (renamePass == renameConfirmPass)) {
            const updatedUser = {
                adminID: localStorage.getItem("loginId"),
                username: renameUser,
                password: renamePass
            };

            updateAdminUser(updatedUser);

        };
    };

    return (
        <>
            <PageHeader title="Settings |" underTitle="Add new admin user or change current user details."/>

            <div className="d-flex flex-column align-items-center">

                <div className="settings-content">
                    <h2 className="m-5">Login ID: <i className="text-primary">{localStorage.getItem("loginId")}</i></h2>

                    <AlertMessage
                        display={usernameAvailable ? "none" : ""}
                        message={usernameAvailable ? "" : "Username not available."}
                        alertId={1}
                    />

                    <div className="d-flex justify-content-center w-100">
                        <div className="settings-form  border border-dark rounded">
                            <p> <u>Change Username & Password</u></p>
                            <input onChange={(e) => {handleChange(e.target)}} value={renameUser} placeholder="New Username" name="rename-user" type="text" />
                            <input onChange={(e) => {handleChange(e.target)}} value={renamePass} placeholder="New Password" name="rename-password" type="password" />
                            <input onChange={(e) => {handleChange(e.target)}} value={renameConfirmPass} placeholder="Confirm Password" name="rename-confirm-password" type="password" />
                            <button onClick={handleSave} className="btn btn-success w-100 m-3">Save</button>
                        </div>

                        <div className="settings-form  border border-dark rounded">
                            <p> <u>New Admin</u></p>
                            <input onChange={(e) => {handleChange(e.target)}} value={newUsername} placeholder="Username" name="new-username" type="text" />
                            <input onChange={(e) => {handleChange(e.target)}} value={newPassword} placeholder="Password" name="new-password" type="password" />
                            <input onChange={(e) => {handleChange(e.target)}} value={newConfirmPassword} placeholder="Confirm Password" name="new-confirm-password" type="password" />
                            <button onClick={addNewUser} className="btn btn-primary w-75 m-3">Add User</button>
                        </div>
                    </div>

    
                </div>

            </div>
        </>
    );
};

export default SettingsPage;