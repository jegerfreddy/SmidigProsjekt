import React, { useState, useEffect } from 'react';
import OptionNode from './OptionNode';

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

interface EventNodeProps {
  event: Event;
  allEvents: Event[];
  addEvent: (parentId: number, optionId: number, selectedEventId: number, isStartingNode: boolean) => void;
  removeEvent: (eventId: number) => void;
  path: number[];
  isStartingNode: boolean;
  saveChoice: (parentId: number, optionId: number, selectedEventId: number, isLoopingBack: boolean) => void;
  color?: number;
}

const EventNode: React.FC<EventNodeProps> = ({
  event,
  allEvents,
  addEvent,
  removeEvent,
  path,
  isStartingNode,
  saveChoice,
  color,
}) => {
  const [selectedEventIds, setSelectedEventIds] = useState<{ [key: number]: number | undefined }>({});

  useEffect(() => {
    const newSelectedEventIds = event.options.reduce((acc, option) => {
      if (option.children.length > 0) {
        acc[option.id] = option.children[0].id;
      }
      return acc;
    }, {} as { [key: number]: number | undefined });

    setSelectedEventIds(newSelectedEventIds);
  }, [event]);

  const handleSelectChange = (optionId: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setSelectedEventIds((prev) => ({ ...prev, [optionId]: value }));

    if (!path.includes(value)) {
      addEvent(event.id, optionId, value, isStartingNode);
      saveChoice(event.id, optionId, value, false); // Save the choice in the desired format
    } else {
      saveChoice(event.id, optionId, value, true); // Save the looping back choice
    }
  };

  return (
    <div className={`event-node event${color}`}>
      <div className="event-title">
        <h3>{event.title}</h3>
        <button onClick={() => removeEvent(event.id)}>Remove Event</button>
      </div>
      <div className="options">
        {event.options.map((option) => (
          <div key={option.id} className="option-container">
            <OptionNode option={option} />
            <select
              onChange={(e) => handleSelectChange(option.id, e)}
              value={selectedEventIds[option.id] || ''}
            >
              <option value="" disabled>
                Select Event to Add
              </option>
              {allEvents
                .filter((e) => e.id !== event.id) // Prevent adding the same event
                .map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.title}
                  </option>
                ))}
            </select>
          </div>
        ))}
      </div>
      <div className="children">
        {event.options.flatMap((option) =>
          option.children.map((childEvent) => (
            <EventNode
              key={childEvent.id}
              event={childEvent}
              allEvents={allEvents}
              addEvent={addEvent}
              removeEvent={removeEvent}
              path={[...path, event.id]}
              isStartingNode={false} // This is not the starting node
              saveChoice={saveChoice} // Pass the saveChoice function down
              color={option.id} // Pass the option ID as color
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EventNode;
