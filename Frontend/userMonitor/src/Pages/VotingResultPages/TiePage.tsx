import React from "react";
import { useParams } from "react-router-dom";

const TiePage: React.FC = () => {
    const { actEventId } = useParams<{ actEventId: string }>();

    switch (actEventId) {
        case'1':
            return (
                <main className="d-flex flex-column align-items-center justify-content-center vh-100 text-center option-tiePage-bg-red">
                    <h1 className="text-center justify-content-center position relative">
                        Rød vant
                    </h1>
                    <img className="img-fluid position absolute p-3 m-5" src="/images/tie.png" alt="tie-bilde" />
                </main>
            )
        case '2':
            return (
                <main className="d-flex flex-column align-items-center justify-content-center vh-100 text-center option-2">
                    <h1 className="text-center justify-content-center position relative">
                        Lilla vant
                    </h1>
                    <img className="img-fluid position absolute p-3 m-5" src="/images/tie.png" alt="tie-bilde" />
                </main>
            )
        case '3':
            return (
                <main className="d-flex flex-column align-items-center justify-content-center vh-100 text-center option-3">
                    <h1 className="text-center justify-content-center position relative">
                        Blå vant
                    </h1>
                    <img className="img-fluid position absolute p-3 m-5" src="/images/tie.png" alt="tie-bilde" />
                </main>
            )
        case '4':
            return (
                <main className="d-flex flex-column align-items-center justify-content-center vh-100 text-center option-1">
                    <h1 className="text-center justify-content-center position relative">
                        Grønn vant
                    </h1>
                    <img className="img-fluid position absolute p-3 m-5" src="/images/tie.png" alt="tie-bilde" />
                </main>
            )
        default:
    return (
            <main className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bgColor5">
                <h1 className="text-center justify-content-center position relative">
                    Det ble uavgjort
                </h1>
                <img className="img-fluid position absolute p-3 m-5" src="/images/tie.png" alt="tie-bilde" />
            </main>
            )
}};

export default TiePage;