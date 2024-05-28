import React from 'react';
import { AvatarItemProps } from '../../Interfaces/IAvatar';


const AvatarItem: React.FC<AvatarItemProps> = ({ imageUrl }) => {
    return (
        <div className="avatarItem">
            <img src={imageUrl} alt="Avatar" />
        </div>
    );
};

export default AvatarItem;