import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const RoutingMain = () => {

    return (
        <>
            <BrowserRouter>
                <nav>
                    <Link to={"/"}>
                        <button>Act Overview</button>
                    </Link>

                    <Link to={"/stats"}>
                        <button>Stats</button>
                    </Link>
                </nav>

                <main>

                    <Routes>
                        <Route path="/" /*element={<ActOverviewPage/>}*/ />
                        <Route path="/stats" /*element={<StatsPage}*/ />
                    </Routes>

                </main>
            </BrowserRouter>
        </>
    )
}

export default RoutingMain;