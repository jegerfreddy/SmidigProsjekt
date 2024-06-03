import React from "react";

const TiePage: React.FC = () => {

    return (
        <main className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bgColor5">
            <h1 className="text-center justify-content-center position relative">
                Det ble uavgjort
            </h1>
            <img className="img-fluid position absolute p-3 m-5" src="images/tie.png" alt="tie-bilde" />
        </main>
    )
};

export default TiePage;