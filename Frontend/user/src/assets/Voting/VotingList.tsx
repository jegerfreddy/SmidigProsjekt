import React, { useState } from 'react';
import VotingItem from './VotingItem';
import { VotingListProps, VotingItemProps, GroupedVotingItemProps } from '../../Interfaces/IVoting';

const tempVoteData: VotingItemProps[] = [
    { id: 1, questionId: 1, option: "Valg 1" },
    { id: 2, questionId: 1, option: "Valg 2" },
    { id: 3, questionId: 1, option: "Valg 3" },
    { id: 4, questionId: 1, option: "Valg 4" },
    { id: 5, questionId: 2, option: "Valg 5" },
    { id: 6, questionId: 2, option: "Valg 6" },
];

const groupAndLimitItems = (options: VotingItemProps[]): GroupedVotingItemProps[] => {
    const groupedItems: { [key: number]: VotingItemProps[] } = {};

    // Group items by questionId
    options.forEach(item => {
        if (!groupedItems[item.questionId]) {
            groupedItems[item.questionId] = [];
        }
        groupedItems[item.questionId].push(item);
    });

    // Convert to array and limit each group to 4 items
    return Object.keys(groupedItems).map(questionId => ({
        questionId: Number(questionId),
        items: groupedItems[Number(questionId)].slice(0, 4) // Convert questionId to number
    }));
};

const VotingList: React.FC<VotingListProps> = ({ options = tempVoteData }) => {
    const groupedOptions = groupAndLimitItems(options);
    const [currentQuestionIndex] = useState(0);

    const currentGroup = groupedOptions[currentQuestionIndex];

    const getRandomColorClass = (id?: number) => {
        const randomColor = Math.floor(Math.random() * 10) + 1;
        return `randomColor${randomColor}`;
    };

    return (
        <div className='container'>
            <div key={currentGroup.questionId} className='container'>
                <div className='row g-3 m-2'>
                    {currentGroup.items.map(item => (
                        <div key={item.id} className={`rounded ${getRandomColorClass(item.id)}`}>
                            <VotingItem {...item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VotingList;
