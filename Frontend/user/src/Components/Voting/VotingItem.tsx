import React, { useContext, useState, useEffect } from "react";
import { IVote, VotingItemProps } from "../../Interfaces/IVoting";
import { GeneralContext } from "../../Contexts/UserContext";
import { IGeneralContext } from "../../Interfaces/IContext";
import { useNavigate } from "react-router-dom";

const VotingItem: React.FC<VotingItemProps> = ({ event }) => {
  const userContext = useContext(GeneralContext) as IGeneralContext<IVote>;
  const [actId] = useState<number>(1);
  const yourUserID = Number(localStorage.getItem('yourUserID') || '1');
  const navigate = useNavigate();
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    setWs(socket);

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleOptionClick = (option: number) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const voteData = {
        type: 'VOTE',
        option: option,
        actId: actId,
        actEventId: event.acteventID,
        userId: yourUserID
      };
      console.log('Sending vote:', voteData);
      ws.send(JSON.stringify(voteData));
      localStorage.setItem('youVotedFor', option.toString());
       navigate(`/userVoted`);
     }
  };

  if (!event) return null;

  return (
    <div>
      {event.option1 && (
        <div className='vote-box option-1' onClick={() => handleOptionClick(1)}>
          <p>{event.option1}</p>
        </div>
      )}
      {event.option2 && (
        <div className='vote-box option-2' onClick={() => handleOptionClick(2)}>
          <p>{event.option2}</p>
        </div>
      )}
      {event.option3 && (
        <div className='vote-box option-3' onClick={() => handleOptionClick(3)}>
          <p>{event.option3}</p>
        </div>
      )}
      {event.option4 && (
        <div className='vote-box option-4' onClick={() => handleOptionClick(4)}>
          <p>{event.option4}</p>
        </div>
      )}
    </div>
  );
};

export default VotingItem;
