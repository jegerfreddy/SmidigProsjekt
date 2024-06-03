import React from 'react';

interface SelectedAvatarProps {
    selectedAvatar: string;
    username: string;
}

const SelectedAvatar: React.FC<SelectedAvatarProps> = ({ selectedAvatar, username }) => {
    return (
        <div>
            {selectedAvatar && <img src={selectedAvatar} alt="/images/Avatar-4.png" />}
            <h3>{username}</h3>
        </div>
    );
};

export default SelectedAvatar;
