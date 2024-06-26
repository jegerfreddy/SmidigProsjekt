import React from 'react';
import { AvatarItemProps } from '../../Interfaces/IAvatar';

const AvatarItem: React.FC<AvatarItemProps> = ({ imageUrl, id, onClick, orientation }) => {
    return (
        <div className={`col-4 mb-4 ${orientation === 'vertical' ? 'vertical-layout' : 'px-0 horizontal-layout'}`}>
            <img src={imageUrl} alt={`Avatar ${id}`} className="avatarImg" onClick={() => onClick(id)} />
        </div>
    );
};

export default AvatarItem;
