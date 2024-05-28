import React from 'react';

import StartPage from '../Pages/StartPage';
import UserLoginPage from '../Pages/UserLoginPage';
import ChooseAvatarPage from '../Pages/ChooseAvatarPage';
import VotingPage from '../Pages/VotingPage';
import ResultPage from '../Pages/ResultPage';
import GameLobby from '../Pages/GameLobby';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhoneInfo from '../assets/Phone/PhoneInfo';
import ChooseUserNamePage from '../Pages/ChooseUserNamePage';


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
            </Routes>
        </Router>
    );
};

export default Routing;