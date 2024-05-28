import React from 'react';
import AvatarItem from './AvatarItem';
import { AvatarListProps } from '../../Interfaces/IAvatar';

const tempAvatarData = [
    { id: 1, imageUrl: "/images/Avatar-1.png" },
    { id: 2, imageUrl: "/images/Avatar-2.png" },
    { id: 3, imageUrl: "/images/Avatar-3.png" },
    { id: 4, imageUrl: "/images/Avatar-4.png" },
    { id: 5, imageUrl: "/images/Avatar-5.png" },
    { id: 6, imageUrl: "/images/Avatar-6.png" },
    { id: 7, imageUrl: "/images/Avatar-7.png" },
    { id: 8, imageUrl: "/images/Avatar-8.png" },
    { id: 9, imageUrl: "/images/Avatar-9.png" },
    { id: 10, imageUrl: "/images/Avatar-10.png" },
    { id: 11, imageUrl: "/images/Avatar-11.png" },
    { id: 12, imageUrl: "/images/Avatar-12.png" },
    { id: 13, imageUrl: "/images/Avatar-13.png" },
    { id: 14, imageUrl: "/images/Avatar-14.png" },
    { id: 15, imageUrl: "/images/Avatar-15.png" },
];

const AvatarList: React.FC<AvatarListProps> = ({ avatars = tempAvatarData }) => {
    return (
        <div className='avatarContainer'>
            {avatars.map((avatar) => (
                <AvatarItem key={avatar.id} imageUrl={avatar.imageUrl} id={avatar.id} />
               
            ))}
        </div>
    );
};

export default AvatarList;
