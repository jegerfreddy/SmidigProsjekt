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

const sendVoteToDb = (id: number) => () => {
  window.location.href = `/result`
  console.log(id);
  // Here you would send the vote to the database
  return id;
};

  return (
    <div>
      {event && ( // Check if event is not null or undefined
        <>
        <div className={`rounded ${getRandomColorClass(1)}`} onClick={sendVoteToDb(1)}>
          <p >{event.option1}</p>
        </div>
        <div className={`rounded ${getRandomColorClass(2)}`} onClick={sendVoteToDb(2)}>
          <p >{event.option2}</p>
        </div>
        <div className={`rounded ${getRandomColorClass(3)}`} onClick={sendVoteToDb(3)}>
          <p >{event.option3}</p>
        </div>
        <div className={`rounded ${getRandomColorClass(4)}`} onClick={sendVoteToDb(4)}>
          <p >{event.option4}</p>
        </div>
        </>
      )}
    </div>
  );
};

export default VotingItem;
