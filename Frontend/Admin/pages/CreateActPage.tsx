import PageHeader from "../Components/GlobalComponents/PageHeader";
import CreateActItem from "../Components/CreateActPage/CreateActItem";

const CreateActPage = () => {

    return (
        <>
            <PageHeader 
                title="Create Act |"
                underTitle="Setup new events for your act."
            />

            <CreateActItem/>
        </>
    )
}

export default CreateActPage;