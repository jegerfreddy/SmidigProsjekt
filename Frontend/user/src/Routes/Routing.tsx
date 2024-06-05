import { useState, useEffect } from "react";
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
import { ActEventService, FeedBackService, ResultService, UserService, VerifyService, WinnerService } from "../Services/GetService";



const Routing: React.FC = () => {
  const [gameCodeFromServer, setGameCodeFromServer] = useState('');
  const navigate = useNavigate();
  PhoneInfo();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received:', data);

      switch (data.type) {
        case 'GAME_STATE':
          handleGameStateChange(data.state);
          break;
        case 'NEW_CODE':
          setGameCodeFromServer(data.code);
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


    return () => {
      ws.close();
    };
  }, []);

  const handleGameStateChange = (state: string) => {
    switch (state) {
      case 'START':
        navigate('/');
        break;
      case 'VOTING':
        navigate('/vote/1');
        break;
      case 'RESULT':
        navigate('/waitresult/1');
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
      <Route path="/standByPage" element={<StandByPage />} />
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
      <Route path="/Break" element={<TheaterPausePage />} />
      <Route path="/Waiting" element={<WaitingLobbyPage />} />
      <Route path="/tie/:actEventId" element={<TiePage />} />
      <Route path="/minigame/:actEventId" element={<MiniGamePage />} />
      <Route path="/feedBackPage" element={
        <GeneralProvider service={FeedBackService}>
          <FeedBackPage />
        </GeneralProvider>
      } />
    </Routes>
  );
};

export default Routing;
