import PageHeader from '../Components/GlobalComponents/PageHeader';
import EditEventList from '../Components/EditorPage/EditEventList';

const EditEventsPage = () => {
  return (
    <div className="App">
      <PageHeader title='Edit Event |' underTitle='Change the events options presented to the audience.'/>
      <EditEventList />
    </div>
  );
};

export default EditEventsPage;
