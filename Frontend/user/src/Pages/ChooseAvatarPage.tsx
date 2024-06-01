import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AvatarList from '../assets/Avatar/AvatarList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NextBtn } from '../assets/Button/NextBtn';
import SelectedAvatar from '../assets/Avatar/SelectedAvatar';

const ChooseAvatarPage: React.FC = () => {
    const location = useLocation();
    const { username } = location.state || {username : 'Username'};
    const [selectedAvatar, setSelectedAvatar] = useState<string>('/images/Avatar-4.png');

    const handleClick = (avatarId: number) => {
        const pickedAvatarUrl = `/images/Avatar-${avatarId}.png`;
        setSelectedAvatar(pickedAvatarUrl);
    };

    return (
        <div className='position relative'>
            <section className='text-center my-4'>
                <h1>Velg din avatar</h1>
            </section>

            <section className='text-center my-4'>
                <SelectedAvatar selectedAvatar={selectedAvatar} username={username} />
            </section>

            <section className='text-center my-4'>
                <AvatarList onClick={handleClick} />
            </section>
            
            <section className='text-center my-4'>
                <NextBtn path='waiting' />
            </section>
        </div>
    );
};

export default ChooseAvatarPage;
