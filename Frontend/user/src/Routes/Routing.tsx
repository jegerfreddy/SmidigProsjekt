import { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import PhoneInfo from "../Components/Phone/PhoneInfo";
import { GeneralProvider } from "../Contexts/UserContext";
import ChooseAvatarPage from "../Pages/CreateUserPages/ChooseAvatarPage";
import ChooseUserNamePage from "../Pages/CreateUserPages/ChooseUserNamePage";
import UserLoginPage from "../Pages/CreateUserPages/UserLoginPage";
import FeedBackPage from "../Pages/FeedBackPages/FeedBackPage";
import MiniGamePage from "../Pages/VotingResultPages/MiniGamePage";
import ResultPage from "../Pages/VotingResultPages/ResultPage";
import TiePage from "../Pages/VotingResultPages/TiePage";
import VotingPage from "../Pages/VotingResultPages/VotingPage";
import WaitResultPage from "../Pages/VotingResultPages/WaitResultPage";
import GameLobby from "../Pages/WaitingPages/GameLobby";
import StandByPage from "../Pages/WaitingPages/StandByPage";
import TheaterPausePage from "../Pages/WaitingPages/TheaterPausePage";
import WaitingLobbyPage from "../Pages/WaitingPages/WaitingLobbyPage";
import VerifyUserPage from "../Pages/CreateUserPages/VerifyUserPage";
import EndGamePage from "../Pages/WaitingPages/EndGamePage";
import { ActEventService, FeedBackService, ResultService, UserService, VerifyService, WinnerService } from "../Services/GetService";
import UserVotedPage from "../Pages/VotingResultPages/userVotedPage";

const Routing: React.FC = () => {
  const navigate = useNavigate();
  const [ws, setWs] = useState<WebSocket | null>(null);
  PhoneInfo();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      // Only this component sends the USER_CONNECTED message
      ws.send(JSON.stringify({ type: 'USER_CONNECTED' }));
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received:', data);

      switch (data.type) {
        case 'GAME_STATE':
          handleGameStateChange(data.state, data.actEventId, data.actId);
          break;
        default:
          console.log('Unknown message type:', data.type);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(ws);

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
        navigate('/vote/' + actEventId);
        break;
      case 'RESULT':
        navigate('/waitresult/' + actEventId);
        break;
      case 'MINIGAME':
        navigate('/minigame/' + actEventId);
        break;
      case 'FEEDBACK':
        navigate('/feedBack/' + actId);
        break;
      case 'PAUSE':
        navigate('/Break');
        break;
      case 'STANDBY':
        navigate('/Standby');
        break;
      case 'MINIGAME_WINNER_RESULT' :
        navigate('/userVoted');
          break;
      default:
        console.log('Unknown game state:', state);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<UserLoginPage />} />
      <Route path="/username/:code" element={
        <GeneralProvider service={UserService}>
          <ChooseUserNamePage />
        </GeneralProvider>
      } />
      <Route path="/avatar/:username/:code" element={
        <GeneralProvider service={UserService}>
          <ChooseAvatarPage />
        </GeneralProvider>
      } />
      <Route path="/verifyUser/:userId/:code" element={
        <GeneralProvider service={VerifyService}>
          <VerifyUserPage />
        </GeneralProvider>
      } />
      <Route path="/gameLobby" element={<GameLobby />} />
      <Route path="/Standby" element={<StandByPage />} />
      <Route path="/vote/:actEventId" element={
        <GeneralProvider service={ActEventService}>
          <VotingPage />
        </GeneralProvider>
      } />
      <Route path="/result/:actEventId" element={
        <GeneralProvider service={ResultService}>
          <ResultPage />
        </GeneralProvider>
      } />
      <Route path="/waitresult/:actEventId" element={
        <GeneralProvider service={WinnerService}>
          <WaitResultPage />
        </GeneralProvider>
      } />
      <Route path="/Waiting" element={
        <GeneralProvider service={UserService}>
          <WaitingLobbyPage />
        </GeneralProvider>
      } />
      
      <Route path="/Break" element={<TheaterPausePage />} />

      <Route path="/userVoted" element={<UserVotedPage />} />

      <Route path="/tie/:actEventId" element={<TiePage />} />
      <Route path="/minigame/:actEventId" element={<MiniGamePage />} />
      <Route path="/endGame" element={<EndGamePage />} />
      <Route path="/feedBack/:actId" element={
        <GeneralProvider service={FeedBackService}>
          <FeedBackPage />
        </GeneralProvider>
      } />
    </Routes>
  );
};

export default Routing;
