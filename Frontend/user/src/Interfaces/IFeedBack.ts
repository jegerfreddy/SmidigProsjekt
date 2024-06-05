export interface IFeedBack {
    userID: number;
    rating: number;
    actID: number;
};

export interface FeedBackItemProps {
    onClick : (value: number) => void;
    orientation: string;
  }

export interface FeedBackListProps {
    actEventId: string;
    onClick : (value: number) => void;
    orientation: string;
}