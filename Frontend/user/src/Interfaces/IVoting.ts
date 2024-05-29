export interface VotingItemProps {
    id: number;
    questionId: number;
    option: string;
}

export interface VotingListProps {
    options?: VotingItemProps[];
}

export interface GroupedVotingItemProps {
    questionId: number;
    items: VotingItemProps[];
}
