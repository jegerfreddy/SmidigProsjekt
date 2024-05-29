import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ActOverviewPage } from "../pages/index.ts";
import {AdminProvider} from "../Context/AdminContext.tsx";


const RoutingMain = () => {

    return (
        <>
            <BrowserRouter>
                <AdminProvider>
                    
                    <nav className="nav-bar">

                        <div className="logo p-4">
                            <h1 className="display-4"><u>the LOADING project</u></h1>
                        </div>

                        <div className="link-container">
                            <Link to={"/"}>
                                <button className="navButton btn btn-dark">Act Overview</button>
                            </Link>

                            <Link to={"/stats"}>
                                <button className="navButton btn btn-dark">Stats</button>
                            </Link>
                        </div>
                    </nav>

                    <main className="main-container">

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