import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../Contexts/UserContext";
import { IGeneralContext } from "../../Interfaces/IContext";
import ResultItem from "./ResultItem";
import { IResult } from "../../Interfaces/IResult";

interface Props {
  actEventId: string;
}

const ResultList: React.FC<Props> = ({ actEventId }) => {
  const { getById } = useContext(GeneralContext) as IGeneralContext<IResult>;
  const [result, setResult] = useState<IResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const fetchedResult = await getById(Number(actEventId)); // Convert actEventId to number
        if (fetchedResult) {
          setResult(fetchedResult);
          console.log("Result fetched:", fetchedResult);
        } else {
          console.error("Result not found.");
          setError("Result not found.");
        }
      } catch (e) {
        console.error("Error fetching result:", e);
        setError("Error fetching result.");
      }
    };

    fetchEvent();
  }, [getById, actEventId]); // Include actEventId in the dependency array

  if (error) {
    return <div>{error}</div>;
  }

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <ResultItem result={result}/>
    </div>
  );
};

export default ResultList;
