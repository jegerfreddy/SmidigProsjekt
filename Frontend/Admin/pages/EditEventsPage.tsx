import PageHeader from "../Components/GlobalComponents/PageHeader.tsx";
import EditEventList from "../Components/EditorPage/EditEventList.tsx";

const EditEventsPage = () => {
    return (
        <>
            <PageHeader title="Editor |" underTitle="A place to edit act data."/>

            <EditEventList/>
        </>
    )
}

export default EditEventsPage;