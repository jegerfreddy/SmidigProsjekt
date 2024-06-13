import { useState, useContext, useEffect, useCallback } from 'react';
import { AdminContext } from '../Context/AdminContext';
import { IAdminContext } from '../Interfaces/IAdminContext';
import Flow from '../Components/Node/Flow'; 
import { linkEvents } from '../Services/NodeService';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConnectionData } from '../Interfaces/INode';
import { ReactFlowProvider } from 'reactflow'; 

const handleSave = async (choices: ConnectionData[]) => {
  for (let i = 0; i < choices.length; i++) {
    const { sourceEvent, optionNumber, targetEvent } = choices[i];
    const actEventID = sourceEvent;
    const option = optionNumber;
    const nextActEventID = targetEvent;
    console.log('Saving choice:', actEventID, option, nextActEventID);
    try {
      const result = await linkEvents({ actEventID, option, nextActEventID });
      console.log('Choice saved:', result);
    } catch (error) {
      console.error('Error saving choice:', error);
    }
  }
  console.log('All choices processed.');
};

const LinkEventsPage = () => {
  const { events } = useContext(AdminContext) as IAdminContext;
  const [connections, setConnections] = useState<ConnectionData[]>([]);
  const [choices, setChoices] = useState<{ parentId: number; optionId: number; selectedEventId: number }[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const actID = location.state;

  useEffect(() => {
    if (!actID) {
      console.error('No actID found in location state');
      return;
    }
  }, [actID]);

  const actEvents = events.filter((event) => event.actID === actID);

  const saveConnections = useCallback(async () => {
    console.log('Saving connections:', connections);
    await handleSave(connections);
    console.log('Connections saved successfully.');
  }, [connections]);

  const saveChoice = (parentId: number, optionId: number, selectedEventId: number) => {
    setChoices((prevChoices) => [...prevChoices, { parentId, optionId, selectedEventId }]);
    console.log(`Saved choice: ${parentId}/${optionId}/${selectedEventId}`); 
  };

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <ReactFlowProvider> {/* Wrap with ReactFlowProvider */}
      <main className="LinkPage">
        <Flow events={actEvents} onConnectionsChange={setConnections} saveChoice={saveChoice} />
        <button className="save-button" onClick={saveConnections}>Save</button>
        <button className="leave-button" onClick={goToHomePage}>Leave</button>
      </main>
    </ReactFlowProvider>
  );
};

export default LinkEventsPage;
