import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import EventNode from './EventNode';
import { AdminContext } from '../../Context/AdminContext'; // Import your context
import { useLocation } from 'react-router-dom';
import { IAdminContext } from '../../Interfaces/IAdminContext';
import { IEventItem } from '../../Interfaces/IEventItem';
import { linkEvents } from '../../Services/NodeService';

interface Option {
  id: number;
  text: string;
  children: Event[];
}

interface Event {
  id: number;
  title: string;
  options: Option[];
}

const convertActEventToEvent = (actEvent: IEventItem): Event => {
  return {
    id: actEvent.acteventID,
    title: actEvent.eventTitle,
    options: [
      { id: 1, text: actEvent.option1, children: [] },
      { id: 2, text: actEvent.option2 || '', children: [] },
      { id: 3, text: actEvent.option3 || '', children: [] },
      { id: 4, text: actEvent.option4 || '', children: [] },
    ],
  };
};

const Flowchart: React.FC = () => {
  const { events } = useContext(AdminContext) as IAdminContext;
  const location = useLocation();
  const actID = location.state;

  const actEvents = events.filter((event) => event.actID === actID);

  actEvents.sort((a, b) => a.eventIndex - b.eventIndex);

  const initialEvents = actEvents.map(convertActEventToEvent);

  const [flowchartEvents, setFlowchartEvents] = useState<Event[]>(initialEvents);
  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
  const [choices, setChoices] = useState<{ parentId: number; optionId: number; selectedEventId: number; isLoopingBack: boolean }[]>([]); // State to store the choices

  useEffect(() => {
    setFlowchartEvents(initialEvents);
  }, [actID, events]);

  const addEvent = (parentId: number, optionId: number, selectedEventId: number, isStartingNode: boolean) => {
    const selectedEvent = flowchartEvents.find((event) => event.id === selectedEventId);
    if (!selectedEvent) return;

    const addChildEvent = (events: Event[], path: number[], resetChildren: boolean): Event[] => {
      return events.map((event) => {
        if (event.id === parentId) {
          return {
            ...event,
            options: event.options.map((option) =>
              option.id === optionId
                ? {
                    ...option,
                    children: path.includes(selectedEventId)
                      ? option.children // Don't add the event again if it creates a loop
                      : [{ ...selectedEvent, options: selectedEvent.options.map((opt) => ({ ...opt, children: [] })) }],
                  }
                : { ...option, children: [] } // Reset children for other options
            ),
          };
        }
        return {
          ...event,
          options: event.options.map((option) => ({
            ...option,
            children: resetChildren ? [] : addChildEvent(option.children, path, false),
          })),
        };
      });
    };

    const updatedEvents = isStartingNode
      ? addChildEvent(initialEvents, [], true) // Reset all branches if starting node
      : addChildEvent(flowchartEvents, [parentId], false);
    setFlowchartEvents(updatedEvents);
  };

  const removeEvent = (eventId: number) => {
    const removeChildEvent = (events: Event[]): Event[] => {
      return events
        .map((event) => ({
          ...event,
          options: event.options.map((option) => ({
            ...option,
            children: removeChildEvent(option.children),
          })),
        }))
        .filter((event) => event.id !== eventId);
    };

    setFlowchartEvents(removeChildEvent(flowchartEvents));
  };

  const saveChoice = (parentId: number, optionId: number, selectedEventId: number, isLoopingBack: boolean) => {
    setChoices((prevChoices) => [...prevChoices, { parentId, optionId, selectedEventId, isLoopingBack }]);
    console.log(`Saved choice: ${parentId}/${optionId}/${selectedEventId}`); // Log or save the choice as needed
  };



  const handleSave = async () => {
    for (let i = 0; i < choices.length; i++) {
      try {
        const result = await linkEvents(choices[i]);
        console.log('Choice saved:', result);
      } catch (error) {
        console.error('Error saving choice:', error);
      }
    }
    console.log('All choices processed.');
  };

  const handleNextEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % flowchartEvents.length);
  };

  const handlePrevEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex - 1 + flowchartEvents.length) % flowchartEvents.length);
  };

  return (
    <div className="flowchart">
      {flowchartEvents.length > 0 && (
        <EventNode
          event={flowchartEvents[currentEventIndex]}
          allEvents={flowchartEvents}
          addEvent={addEvent}
          removeEvent={removeEvent}
          path={[flowchartEvents[currentEventIndex].id]}
          isStartingNode={currentEventIndex === 0} // Pass if it is the starting node
          saveChoice={saveChoice} // Pass the saveChoice function down
        />
      )}
      <div className="navigation-buttons">
        <button onClick={handlePrevEvent} disabled={flowchartEvents.length <= 1}>
          Previous Event
        </button>
        <button onClick={handleNextEvent} disabled={flowchartEvents.length <= 1}>
          Next Event
        </button>
      </div>
      <div className="save-button">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Flowchart;
