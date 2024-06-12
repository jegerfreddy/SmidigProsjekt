import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ActOverviewPage, EditEventsPage, CreateActPage, AdminToUserPage, SettingsPage, GetGameCodesPage } from "../pages/index.ts";
import {AdminProvider} from "../Context/AdminContext.tsx";
import LinkEventsPage from "../pages/LinkEventsPage.tsx";

const RoutingMain = () => {

    return (
        <>
            <BrowserRouter>
                <AdminProvider>
                
                    <div>
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

                                <Link to={"/settings"}>
                                    <button className="navButton btn btn-success">Settings</button>
                                </Link>
                                
                                <button className="navButton btn btn-primary mr-0" onClick={() => {
                                    localStorage.removeItem("loginValid");
                                    localStorage.removeItem("acts");
                                    localStorage.removeItem("events");
                                    window.location.reload();
                                }}>Logout</button>

                                
                            </div>
                        </nav>

                        <main className="main-container">
                            <Routes>
                                <Route path="/" element={<ActOverviewPage/>} />
                                <Route path="/act-controller" element={<AdminToUserPage/>} />
                                <Route path="/stats" /*element={<StatsPage}*/ />
                                <Route path="/edit" element={<EditEventsPage/>}/>
                                <Route path="/link" element={<LinkEventsPage/>}/>
                                <Route path="/newAct" element={<CreateActPage/>}/>
                                <Route path="/userserver" element={<AdminToUserPage/>}/>
                                <Route path="/settings" element={<SettingsPage/>}/>
                                <Route path="/getCodes" element={<GetGameCodesPage/>}/>
                            </Routes>
                        </main>
                    </div>
                    
                </AdminProvider>
            </BrowserRouter>
        </>
    )
}

export default RoutingMain;