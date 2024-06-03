import React from 'react';
import AvatarItem from './AvatarItem';
import { AvatarListProps } from '../../Interfaces/IAvatar';
import 'bootstrap/dist/css/bootstrap.min.css';

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
];

const AvatarList: React.FC<AvatarListProps> = ({ avatars = tempAvatarData, onClick, orientation }) => {
    return (
        <div className="container">
            <div className="row">
                {avatars.map((avatar) => (
                    <AvatarItem key={avatar.id} imageUrl={avatar.imageUrl} id={avatar.id} onClick={onClick} orientation={orientation} />
                ))}
            </div>
        </div>
    );
};

export default AvatarList;
