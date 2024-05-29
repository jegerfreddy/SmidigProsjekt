import React from 'react';
import { VotingItemProps } from '../../Interfaces/IVoting';

const VotingItem: React.FC<VotingItemProps> = ({ option }) => {
    return (
        <p className='text-center fs-1'>{option}</p>
    );
};

export default VotingItem;
