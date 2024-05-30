import React, { useState } from 'react';
import VotingItem from './VotingItem';
import { IActEvent, IActEventItemProps, IActEventListProps } from '../../Interfaces/IAct';
import { ActEventService } from '../../Services/GetService';

const ACTEVENT_ID = 1; // Replace '1' with the actual value you want to use
ActEventService.getById(ACTEVENT_ID).then((result) => {
    console.log(result);
});

// Sample data
const tempOptionsDATA: IActEvent[] = [
    { ACTEVENT_ID: 1, EVENT_TITLE: 'Event 1', OPTION_1: 'Valg 1', OPTION_2: 'Valg 2', OPTION_3: 'Valg 3', OPTION_4: 'Valg 4', ACT_ID: 1 },
];

const tempOptionsDATAItems = tempOptionsDATA.flatMap((item) => {
    const EventOptions = [];
    if (item.OPTION_1) EventOptions.push({ id: 1, option: item.OPTION_1, ACTEVENT_ID: item.ACTEVENT_ID });
    if (item.OPTION_2) EventOptions.push({ id: 2, option: item.OPTION_2, ACTEVENT_ID: item.ACTEVENT_ID });
    if (item.OPTION_3) EventOptions.push({ id: 3, option: item.OPTION_3, ACTEVENT_ID: item.ACTEVENT_ID });
    if (item.OPTION_4) EventOptions.push({ id: 4, option: item.OPTION_4, ACTEVENT_ID: item.ACTEVENT_ID });
    return EventOptions;
});

// Group items by ACTEVENT_ID
const groupItemsByEvent = (items: IActEventItemProps[]) => {
    return items.reduce((acc, item) => {
        const { ACTEVENT_ID } = item;
        if (!acc[ACTEVENT_ID]) {
            acc[ACTEVENT_ID] = [];
        }
        acc[ACTEVENT_ID].push(item);
        return acc;
    }, {} as { [key: number]: IActEventItemProps[] });
};

const VotingList: React.FC<IActEventListProps> = ({ options = tempOptionsDATAItems }) => {
    const groupedItems = groupItemsByEvent(options);

    const getRandomColorClass = (id?: number) => {
        const randomColor = Math.floor(Math.random() * 10) + 1;
        return `randomColor${randomColor}`;
    };

    return (
        <div className='container'>
            {Object.entries(groupedItems).map(([eventId, items]) => (
                <div key={eventId} className='container'>
                    <div className='row g-3 m-2'>
                        {items.map(item => (
                            <div key={item.id} className={`rounded ${getRandomColorClass(item.id)}`}>
                                <VotingItem {...item} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VotingList;
