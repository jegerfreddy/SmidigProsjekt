import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ActOverviewPage } from "../pages/index.ts";
import {AdminProvider} from "../Context/AdminContext.tsx";


const RoutingMain = () => {

    return (
        <>
            <BrowserRouter>
                <AdminProvider>
                    
                    <nav className="navBar">
                        <Link to={"/"}>
                            <button>Act Overview</button>
                        </Link>

                        <Link to={"/stats"}>
                            <button>Stats</button>
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