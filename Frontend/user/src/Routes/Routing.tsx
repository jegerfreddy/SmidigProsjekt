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

const Routing: React.FC = () => {
    PhoneInfo();
    return (
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
            </Routes>
        </Router>
    );
};

export default Routing;
