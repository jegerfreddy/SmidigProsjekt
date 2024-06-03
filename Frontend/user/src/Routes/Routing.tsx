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
import { ActEventService, ResultService, UserService } from '../Services/GetService';
import StandByPage from '../Pages/StandByPage';

const Routing: React.FC = () => {
    PhoneInfo();
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserLoginPage />} />
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

                <Route path="/Break" element={<TheaterPausePage />} />
                <Route path="/Waiting" element={<WaitingLobbyPage />} />
            </Routes>
        </Router>
    );
};

export default Routing;
