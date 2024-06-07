import { useContext, useEffect, useState } from "react";
import { IActEvent } from "../../Interfaces/IAct";
import VotingItem from "./VotingItem";
import { GeneralContext, GeneralProvider } from "../../Contexts/UserContext";
import { IGeneralContext } from "../../Interfaces/IContext";
import { ActEventService } from "../../Services/GetService";

interface Props {
  actEventId: number;
}

const VotingList: React.FC<Props> = ({ actEventId }) => {
  const userContext = useContext(GeneralContext) as IGeneralContext<IActEvent>;
  const [event, setEvent] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const fetchedEvent = await ActEventService.getById(actEventId);
        if (fetchedEvent) {
          setEvent(fetchedEvent); // Set the fetched event directly
        } else {
          console.error("Event not found.");
        }
      } catch (e) {
        console.error("Error fetching event:", e);
      }
    };

    fetchEvent();
  }, [userContext, actEventId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row g-3 m-2">
        <GeneralProvider service={ActEventService}>
          <VotingItem event={event} />
        </GeneralProvider>
      </div>
    </div>
  );
};

export default VotingList;
