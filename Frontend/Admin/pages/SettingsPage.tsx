const SettingsPage = () => {

    return (
        <>
            <div className="d-flex flex-column align-items-center p-5">

                <div className="settings-content">
                    <h2>Logged in as: <i className="text-primary">admin</i></h2>

                    <div className="d-flex flex-column m-5">
                        <p>Change Username & Password</p>
                        <input placeholder="New Username" type="text" />
                        <input placeholder="New Password" type="text" />
                    </div>

                    <button>Add New Admin</button>

                    <button className="btn btn-success w-100">Save</button>
                </div>

            </div>
        </>
    );
};

export default SettingsPage;