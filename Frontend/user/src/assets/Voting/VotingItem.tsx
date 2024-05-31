import React from "react";
import { IActEvent } from "../../Interfaces/IAct";

interface VotingItemProps {
  event: IActEvent;
}

const VotingItem: React.FC<VotingItemProps> = ({ event }) => {
  const getRandomColorClass = (id?: number) => {
    const randomColor = Math.floor(Math.random() * 10) + 1;
    return `randomColor${randomColor}`;
};

  return (
    <div>
      {event && ( // Check if event is not null or undefined
        <>
        <div className={`rounded ${getRandomColorClass(1)}`}>
          <p >{event.option1}</p>
        </div>
        <div className={`rounded ${getRandomColorClass(2)}`}>
          <p >{event.option2}</p>
        </div>
        <div className={`rounded ${getRandomColorClass(3)}`}>
          <p >{event.option3}</p>
        </div>
        <div className={`rounded ${getRandomColorClass(4)}`}>
          <p >{event.option4}</p>
        </div>
        </>
      )}
    </div>
  );
};

export default VotingItem;
