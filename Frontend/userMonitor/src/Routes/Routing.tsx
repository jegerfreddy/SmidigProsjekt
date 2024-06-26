import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { GeneralProvider } from "../Contexts/UserContext";
import MiniGamePage from "../Pages/VotingResultPages/MiniGamePage";
import ResultPage from "../Pages/VotingResultPages/ResultPage";
import TiePage from "../Pages/VotingResultPages/TiePage";
import WaitResultPage from "../Pages/VotingResultPages/WaitResultPage";
import StandByPage from "../Pages/WaitingPages/StandByPage";
import TheaterPausePage from "../Pages/WaitingPages/TheaterPausePage";
import EndGamePage from "../Pages/WaitingPages/EndGamePage";
import { ResultService, UserService, WinnerService } from "../Services/GetService";
import QrPage from "../Pages/WaitingPages/QrPage";

const Routing: React.FC = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [voteCountsClear, setVoteCountsClear] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);

      switch (data.type) {
        case 'GAME_STATE':
          handleGameStateChange(data.state, data.actEventId, data.actId);
          break;
        case 'USER_COUNT':
          setUserCount(data.userCount);
          break;
        default:
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleGameStateChange = (state: string, actEventId: string, actId: string) => {
    switch (state) {
      case 'START':
        navigate('/');
        break;
      case 'VOTING':
        setVoteCountsClear(true);
        navigate('/result/' + actEventId);
        break;
      case 'RESULT':
        navigate('/waitresult/' + actEventId);
        break;
      case 'MINIGAME':
        navigate('/minigame/' + actEventId);
        break;
      case 'FEEDBACK':
        navigate('/endGame');
        break;
      case 'PAUSE':
        navigate('/Break');
        break;
      case 'STANDBY':
        navigate('/Standby');
        break;
      case 'CLEAR_VOTES':
        setVoteCountsClear(true);
        break;
      case 'MINIGAME_WINNER_RESULT' :
         navigate('/tie/' + actEventId);
         console.log('Winner reuslt i switchacse');
        break;
      default:
        console.log('Unknown game state:', state);
    }
  };

  const handleVoteCountsClearProcessed = () => {
    setVoteCountsClear(false);
  };

  return (
    <Routes>
      <Route path="/" element={
        <GeneralProvider service={UserService}>
          <QrPage userCountFromSocket={userCount} />
        </GeneralProvider>
      } />
      <Route path="/standBy" element={<StandByPage />} />
      <Route path="/result/:actEventId" element={
        <GeneralProvider service={ResultService}>
          <ResultPage voteCountsClear={voteCountsClear} onClearProcessed={handleVoteCountsClearProcessed} />
        </GeneralProvider>
      } />
      <Route path="/waitresult/:actEventId" element={
        <GeneralProvider service={WinnerService}>
          <WaitResultPage />
        </GeneralProvider>
      } />
      <Route path="/Break" element={<TheaterPausePage />} />
      <Route path="/tie/:actEventId" element={<TiePage />} />
      <Route path="/minigame/:actEventId" element={<MiniGamePage />} />
      <Route path="/endGame" element={<EndGamePage />} />
    </Routes>
  );
};

export default Routing;
