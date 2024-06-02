// VotingList.tsx

import { useContext, useEffect, useState } from "react";
import { IActEvent } from "../../Interfaces/IAct";
import VotingItem from "./VotingItem";
import { GeneralContext, GeneralProvider } from "../../Contexts/UserContext";
import { IGeneralContext } from "../../Interfaces/IContext";
import { VoteService } from "../../Services/GetService";

const VotingList = () => {
  const { getById } = useContext(GeneralContext) as IGeneralContext<IActEvent>;
  const [event, setEvent] = useState<IActEvent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const fetchedEvent = await getById(1); // Fetching event with ID 1
        if (fetchedEvent) {
          setEvent(fetchedEvent);
          console.log("Event fetched:", fetchedEvent);
        } else {
          console.error("Event not found.");
          setError("Event not found.");
        }
      } catch (e) {
        console.error("Error fetching event:", e);
        setError("Error fetching event.");
      }
    };

    fetchEvent();
  }, [getById]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
        <div className='row g-3 m-2'>
        <GeneralProvider service={VoteService}>
            <VotingItem event={event} />
        </GeneralProvider>
        </div>
      </div>
  );
};

export default VotingList;