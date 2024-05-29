import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ActOverviewPage } from "../pages/index.ts";
import {AdminProvider} from "../Context/AdminContext.tsx";


const RoutingMain = () => {

    return (
        <>
            <BrowserRouter>
                <AdminProvider>
                    
                    <nav className="d-flex align-items-start p-3 bg-warning">
                        <Link to={"/"}>
                            <button className="navButton">Act Overview</button>
                        </Link>

                        <Link to={"/stats"}>
                            <button className="navButton">Stats</button>
                        </Link>
                    </nav>

                    <main>

                        <Routes>
                            <Route path="/" element={<ActOverviewPage/>} />
                            <Route path="/stats" /*element={<StatsPage}*/ />
                        </Routes>

                    </main>
                    
                </AdminProvider>
            </BrowserRouter>
        </>
    )
}

export default RoutingMain;