import { Link } from "react-router-dom";
import ActList from "../Components/OverviewPage/ActList";
import PageHeader from "../Components/GlobalComponents/PageHeader.tsx";

const ActOverviewPage = () => {

    return (
        <>
            <PageHeader 
                title="Act Overview |"
                underTitle="A list of all exisiting acts."
            />

            <div className="page-header-button-container bg-dark">
                <Link to="/newAct">
                    <button className="mr-3 bg-light text-dark"><p className="h5 m-0">Create Act</p></button>
                </Link>

                <Link to="/getCodes">
                    <button className="mr-3 bg-light text-dark border">
                        <p className="h5 m-0">Generate Verification Codes</p>
                    </button>
                </Link>
            </div>

            <ActList></ActList>
        </>
    );
}

export default ActOverviewPage;