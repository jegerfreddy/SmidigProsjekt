import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AvatarList from '../assets/Avatar/AvatarList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NextBtn } from '../assets/Button/NextBtn';
import SelectedAvatar from '../assets/Avatar/SelectedAvatar';
import PhoneInfo from '../assets/Phone/PhoneInfo';

const ChooseAvatarPage: React.FC = () => {
    const location = useLocation();
    const { username } = location.state || { username: 'Username' };
    const [selectedAvatar, setSelectedAvatar] = useState<string>('/images/Avatar-4.png');

    const handleClick = (avatarId: number) => {
        const pickedAvatarUrl = `/images/Avatar-${avatarId}.png`;
        setSelectedAvatar(pickedAvatarUrl);
    };

    const { width, height, orientation } = PhoneInfo();
    console.log('width i page:', width);
    console.log('height i page:', height);
    console.log('orientation i page:', orientation);
    //className={`class for alle her ${orientation === 'vertical' ? 'vertical-layout' : ' horizontal-layout'}`}/>

    return (
        <div className='position-relative vh-100'>
            <section 
                className={`text-center my-4 position-absolute ${orientation === 'vertical' ? 'top-0 start-50 translate-middle-x vertical-layout' : 'top-0 end-50 m-5 p-3 horizontal-layout'}`}>
                <h2>Velg avatar</h2>
            </section>

            <section 
                className={`text-center position-absolute ${orientation === 'vertical' ? 'my-5 p-5 top-0 start-50 translate-middle-x vertical-layout' : ' top-0 end-0 m-5 horizontal-layout'}`}>
                    <SelectedAvatar selectedAvatar={selectedAvatar} username={username} />
            </section>

            <section 
                className={`text-center position-absolute ${orientation === 'vertical' ? 'top-50 start-50 mb-5 translate-middle vertical-layout' : 'bottom-0 start-0 mb-5 horizontal-layout'}`}>
                    <AvatarList onClick={handleClick} orientation={orientation} />
            </section>
            
            <section>
                    <NextBtn path='waiting' />
            </section>
        </div>
    );
};

export default ChooseAvatarPage;
