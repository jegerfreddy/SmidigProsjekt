import ActList from "../Components/OverviewPage/ActList";
import PageHeader from "../Components/GlobalComponents/PageHeader.tsx";

const ActOverviewPage = () => {

    return (
        <>
            <PageHeader 
                title="Act Overview |"
                underTitle="A list of all exisiting acts."
            />

           <ActList></ActList>
        </>
    );
}

export default ActOverviewPage;