import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StartPage from '../Pages/StartPage';
import UserLoginPage from '../Pages/UserLoginPage';
import ChooseUserNamePage from '../Pages/ChooseUserNamePage';
import ChooseAvatarPage from '../Pages/ChooseAvatarPage';
import VotingPage from '../Pages/VotingPage';
import ResultPage from '../Pages/ResultPage';
import GameLobby from '../Pages/GameLobby';
import PhoneInfo from '../assets/Phone/PhoneInfo';
import TheaterPausePage from '../Pages/TheaterPausePage'
import WaitingLobbyPage from '../Pages/WaitingLobbyPage';
import { GeneralProvider } from '../Contexts/UserContext';
import { ActService, UserService } from '../Services/GetService';

const Routing: React.FC = () => {
    PhoneInfo();
    return (
    <GeneralProvider service={ActService}>
        <GeneralProvider service={UserService}>
                <Router>
                    <Routes>
                        <Route path="/" element={<UserLoginPage />} />
                        <Route path="/login" element={<StartPage />} />
                        <Route path="/username" element={<ChooseUserNamePage />} />
                        <Route path="/avatar" element={<ChooseAvatarPage />} />
                        <Route path="/gameLobby" element={<GameLobby />} />
                        <Route path="/voting" element={<VotingPage />} />
                        <Route path="/result" element={<ResultPage />} />
                        <Route path="/Break" element={<TheaterPausePage/>} />
                        <Route path="/Waiting" element={<WaitingLobbyPage/>} />
                    </Routes>
                </Router>
        </GeneralProvider>
    </GeneralProvider>
    );
};

export default Routing;
