import React from 'react';
import { AvatarItemProps } from '../../Interfaces/IAvatar';


const AvatarItem: React.FC<AvatarItemProps> = ({ id, imageUrl }) => {
    return (
        <div className="avatar-item">
            <h1>{id}</h1>
            <img src={imageUrl} alt="Avatar" />
        </div>
    );
};

export default AvatarItem;