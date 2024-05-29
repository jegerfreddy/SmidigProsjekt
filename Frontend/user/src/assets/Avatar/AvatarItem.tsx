import React from 'react';
import { AvatarItemProps } from '../../Interfaces/IAvatar';

const AvatarItem: React.FC<AvatarItemProps> = ({ imageUrl }) => {
    return (
        <img src={imageUrl} alt="Avatar" className='img-fluid' />
    );
};

export default AvatarItem;
