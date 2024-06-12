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

            <div className="page-header-button-container">
                <Link to="/newAct">
                    <button className="">New Act</button>
                </Link>

                <Link to="/getCodes">
                    <button className="ml-3">Generate Verification Codes</button>
                </Link>
            </div>

           <ActList></ActList>
        </>
    );
}

export default ActOverviewPage;