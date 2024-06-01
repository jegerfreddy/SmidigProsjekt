import React from 'react';
import { AvatarItemProps } from '../../Interfaces/IAvatar';

const AvatarItem: React.FC<AvatarItemProps> = ({ imageUrl, id, onClick }) => {
    return (
        <div className="col-4 mb-4">
            <img src={imageUrl} alt={`Avatar ${id}`} className="img-fluid avatarImg" onClick={() => onClick(id)} />
        </div>
    );
};

export default AvatarItem;
