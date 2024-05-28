import React from 'react';

interface AvatarItemProps {
    imageUrl: string;
    id: number;
}

const AvatarItem: React.FC<AvatarItemProps> = ({ imageUrl }) => {
    return (
        <img src={imageUrl} alt="Avatar" className='img-fluid' />
    );
};

export default AvatarItem;
