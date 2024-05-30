import React from 'react';
import { IActEventItemProps } from '../../Interfaces/IAct';

const VotingItem: React.FC<IActEventItemProps> = ({ id, ACTEVENT_ID, option }) => {
    return (
        <div>
            <p>{option}</p>
        </div>
    );
};

export default VotingItem;
