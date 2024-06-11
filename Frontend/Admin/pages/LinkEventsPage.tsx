import { useState, useContext, useEffect, useCallback } from 'react';
import { AdminContext } from '../Context/AdminContext';
import { IAdminContext } from '../Interfaces/IAdminContext';
import Flow from '../Components/Node/Flow'; // Adjust the import path as necessary
import { linkEvents } from '../Services/NodeService';
import { useLocation } from 'react-router-dom';
import { ConnectionData } from '../Interfaces/INode';


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
    console.log(`Saved choice: ${parentId}/${optionId}/${selectedEventId}`); // Log or save the choice as needed
  };

  return (
    <div className="App" style={{ width: '100vw', height: '100vh' }}>
      <h1>Link Event</h1>
      <Flow events={actEvents} onConnectionsChange={setConnections} saveChoice={saveChoice} />
      <button className="save-button" onClick={saveConnections}>Save</button>
    </div>
  );
};

export default LinkEventsPage;
