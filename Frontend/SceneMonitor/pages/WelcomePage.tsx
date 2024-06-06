import { useContext } from "react";
import { MonitorContext } from "../context/MonitorContext";
import { IMonitorContext } from "../interfaces/IMonitorContext";


const WelcomePage = () => {

    const {act} = useContext(MonitorContext) as IMonitorContext;

    return (
        <>
            <div className="bg-light">
                <h1>Velkommen til Teater</h1>
                <p>{act?.actName}</p>
            </div>
        </>
    );
}

export default WelcomePage;