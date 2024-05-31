import React, { useState } from 'react';
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
];

const AvatarList: React.FC<AvatarListProps> = ({ avatars = tempAvatarData }) => {
    const [pickedAvatar, setPickedAvatar] = useState(tempAvatarData[0].imageUrl);

    const handleClick = (avatarId: number) => {
        const pickedAvatarUrl = `/images/Avatar-${avatarId}.png`;
        setPickedAvatar(pickedAvatarUrl);
    };

    return (
        <div className='container'>
            <div className='d-flex justify-content-center align-items-center my-3 p-5 m-5'>
                <img src={pickedAvatar} alt="Selected Avatar" className='avatar-picked img-fluid' />
            </div>
            <div className='row row-cols-3 g-4'>
                {avatars.map((avatar) => (
                    <div key={avatar.id} className='col d-flex justify-content-center'>
                        <div onClick={() => handleClick(avatar.id)}>
                            <AvatarItem imageUrl={avatar.imageUrl} id={avatar.id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvatarList;
