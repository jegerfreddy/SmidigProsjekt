import React from 'react';
import AvatarList from '../assets/Avatar/AvatarList';

const ChooseAvatarPage: React.FC = () => {
    return (
        <main className='avatarMain'>
            <section className='avatarTitleSection'>
                <h1 className='avatarTitle'>Choose Avatar Page</h1>
            </section>

            <section>
                <img src="/images/Avatar-1.png" alt="" className='avatarPicked'/>
            </section>

            <section>
                <AvatarList />
            </section>
        </main>
    );
};

export default ChooseAvatarPage;