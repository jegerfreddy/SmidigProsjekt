import React, { useContext, useState } from "react";
import { IVote, VotingItemProps } from "../../Interfaces/IVoting";
import { GeneralContext } from "../../Contexts/UserContext";
import { IGeneralContext } from "../../Interfaces/IContext";
import { useNavigate } from "react-router-dom";
import { VoteService } from "../../Services/GetService";

const VotingItem: React.FC<VotingItemProps> = ({ event }) => {
  const userContext = useContext(GeneralContext) as IGeneralContext<IVote>;

  const [actId] = useState<number>(1);
/*   const yourUserID = parseInt(localStorage.getItem('yourUserID') || '0', 10);
 */


  const yourUserID = 1; 
  // For testing purposes
  const navigate = useNavigate();

  const sendVoteToDb = async (newVote: IVote) => {
    try {
      await VoteService.post(newVote);
      navigate(`/waitresult/${newVote.actEvent.acteventID}`); // Navigate to the result page with the corresponding acteventId
    } catch (error) {
      console.error('Error occurred while submitting user data:', error);
    }
  };

  const handleOptionClick = (option: number) => {
    const newVote: IVote = {
      act: { actID: actId },
      actEvent: { acteventID: event.acteventID, act: { actID: actId } },
      user: { userID: yourUserID },
      option: option
    };
    console.log('New vote:', newVote);
    sendVoteToDb(newVote);
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
