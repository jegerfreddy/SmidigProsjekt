import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserLoginPage from '../Pages/UserLoginPage';
import ChooseUserNamePage from '../Pages/ChooseUserNamePage';
import ChooseAvatarPage from '../Pages/ChooseAvatarPage';
import VotingPage from '../Pages/VotingPage';
import ResultPage from '../Pages/ResultPage';
import GameLobby from '../Pages/GameLobby';
import PhoneInfo from '../Components/Phone/PhoneInfo';
import TheaterPausePage from '../Pages/TheaterPausePage';
import WaitingLobbyPage from '../Pages/WaitingLobbyPage';
import { GeneralProvider } from '../Contexts/UserContext';
import { ActEventService, ResultService, UserService, VertifyService, WinnerService } from '../Services/GetService';
import StandByPage from '../Pages/StandByPage';
import TiePage from '../Pages/TiePage';
import MiniGamePage from '../Pages/MiniGamePage';
import WaitResultPage from '../Pages/WaitResultPage';
import FeedBackPage from '../Pages/FeedBackPage';


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
                <Route path="/vertifyUser/:userID/:code" element={
                    <GeneralProvider service={VertifyService}>
                        <VertifyUserPage />
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
