import React from 'react';
import AvatarList from '../assets/Avatar/AvatarList';

const ChooseAvatarPage: React.FC = () => {
    return (
        <main>
            <section>
                <h1>Choose Avatar Page</h1>
            </section>

            <section>
                <AvatarList avatars={[]} />
            </section>
        </main>
    );
};

export default ChooseAvatarPage;