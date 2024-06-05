import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const TiePage: React.FC = () => {
    const { actEventId } = useParams<{ actEventId: string }>();
    const navigate = useNavigate();

    return (
        <main className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bgColor5">
            <h1 className="text-center justify-content-center position relative">
                Det ble uavgjort
            </h1>
            <img className="img-fluid position absolute p-3 m-5" src="/images/tie.png" alt="tie-bilde" />
        </main>
    )
};

export default TiePage;