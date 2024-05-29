import ActList from "../Components/ActList"

const ActOverviewPage = () => {

    return (
        <>
            <div className="page-header d-flex align-items-center p-3">
                <h1 className="display-5 mt-2" >Acts Overview |</h1>
                <p className="mt-4 ml-2 text-secondary">A list of all existing acts.</p>
            </div>

           <ActList></ActList>
        </>
    );
}

export default ActOverviewPage;