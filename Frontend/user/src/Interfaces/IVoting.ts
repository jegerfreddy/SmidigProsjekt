import { IActEvent } from "./IAct";

export interface IVote {
    voteID?: number;
    act: { actID: number };
    user: { userID: number };
    actEvent: { acteventID: number, act: { actID: number } };
    option: number;
}

export interface VotingItemProps {
    event: IActEvent;
}