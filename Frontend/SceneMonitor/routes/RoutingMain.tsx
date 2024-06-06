import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import PreGamePage from "../pages/PreGamePage.tsx";
import { MonitorProvider } from "../context/MonitorContext";

const RoutingMain = () => {

    return (
        <>
            <BrowserRouter>
                <MonitorProvider>
                
                    <div>
                    
                        <main className="main-container">
                            <Routes>

                                <Route path="/" element={<PreGamePage/>} />
                                <Route path="/welcome-page" element={<WelcomePage/>} />
                                
                            </Routes>
                        </main>
                        
                    </div>
                    
                </MonitorProvider>
            </BrowserRouter>
        </>
    );
}

export default RoutingMain;