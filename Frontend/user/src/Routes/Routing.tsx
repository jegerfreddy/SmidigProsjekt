import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChooseUserNamePage from '../Pages/CreateUserPages/ChooseUserNamePage';
import ChooseAvatarPage from '../Pages/CreateUserPages/ChooseAvatarPage';
import PhoneInfo from '../Components/Phone/PhoneInfo';
import TheaterPausePage from '../Pages/WaitingPages/TheaterPausePage';
import { GeneralProvider } from '../Contexts/UserContext';
import { ActEventService, ResultService, UserService, WinnerService} from '../Services/GetService';
import UserLoginPage from '../Pages/CreateUserPages/UserLoginPage';
import FeedBackPage from '../Pages/FeedBackPages/FeedBackPage';
import MiniGamePage from '../Pages/VotingResultPages/MiniGamePage';
import ResultPage from '../Pages/VotingResultPages/ResultPage';
import TiePage from '../Pages/VotingResultPages/TiePage';
import VotingPage from '../Pages/VotingResultPages/VotingPage';
import WaitResultPage from '../Pages/VotingResultPages/WaitResultPage';
import GameLobby from '../Pages/WaitingPages/GameLobby';
import StandByPage from '../Pages/WaitingPages/StandByPage';
import WaitingLobbyPage from '../Pages/WaitingPages/WaitingLobbyPage';


const Routing: React.FC = () => {
    PhoneInfo();
    return (
        <Router>
            <Routes>
                <Route path="/GAMECODE" element={<UserLoginPage />} />
                <Route path="/username" element={
                    <GeneralProvider service={UserService}>
                        <ChooseUserNamePage />
                    </GeneralProvider>
                } />
                <Route path="/avatar" element={
                    <GeneralProvider service={UserService}>
                        <ChooseAvatarPage />
                    </GeneralProvider>
                } />
           

                <Route path="/gameLobby" element={<GameLobby />} />
                <Route path="/standByPage" element={<StandByPage />} />

                <Route path="/voting" element={
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
                <Route path="/feedBackPage" element={<FeedBackPage />} />

            </Routes>
        </Router>
    );
};

export default Routing;
