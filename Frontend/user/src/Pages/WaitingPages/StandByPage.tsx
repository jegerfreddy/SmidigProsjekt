import React from "react";

/* StandBy - page when the teather is running */

const StandByPage: React.FC = () => {

    return (
        <main className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bgColor">
            <div className="text-center justify-content-center position relative"> Følg med på teaterstykket</div>
            <img className="img-fluid position absolute p-3" src="images/pølse.png" alt="Pølse-bilde" />
        </main>
    )
};

export default StandByPage;