import React from 'react';
import AvatarItem from './AvatarItem';
import { AvatarListProps } from '../../Interfaces/IAvatar';

const tempAvatarData = [
    { id: 1, imageUrl: "Frontend/user/public/images/Avatar-1.png" },
    { id: 2, imageUrl: "Frontend/user/public/images/Avatar-2.png" },
    { id: 3, imageUrl: "Frontend/user/public/images/Avatar-3.png" },
    { id: 4, imageUrl: "Frontend/user/public/images/Avatar-4.png" },
    { id: 5, imageUrl: "Frontend/user/public/images/Avatar-5.png" },
    { id: 6, imageUrl: "Frontend/user/public/images/Avatar-6.png" },
    { id: 7, imageUrl: "Frontend/user/public/images/Avatar-7.png" },
    { id: 8, imageUrl: "Frontend/user/public/images/Avatar-8.png" },
    { id: 9, imageUrl: "Frontend/user/public/images/Avatar-9.png" },
    { id: 10, imageUrl: "Frontend/user/public/images/Avatar-10.png" },
    { id: 11, imageUrl: "Frontend/user/public/images/Avatar-11.png" },
    { id: 12, imageUrl: "Frontend/user/public/images/Avatar-12.png" },
    { id: 13, imageUrl: "Frontend/user/public/images/Avatar-13.png" },
    { id: 14, imageUrl: "Frontend/user/public/images/Avatar-14.png" },
    { id: 15, imageUrl: "Frontend/user/public/images/Avatar-15.png" },
];

const AvatarList: React.FC<AvatarListProps> = ({ avatars = tempAvatarData }) => {
    return (
        <div>
            {avatars.map((avatar) => (
                <AvatarItem key={avatar.id} id={avatar.id} imageUrl={avatar.imageUrl} />
            ))}
        </div>
    );
};

export default AvatarList;
