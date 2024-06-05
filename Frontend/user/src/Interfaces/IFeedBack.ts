export interface IFeedBack {
    userID: number;
    rating: number;
};

export interface FeedBackItemProps {
    onClick : (value: number) => void;
  }

export interface FeedBackListProps {
    actEventId: string;
    onClick : (value: number) => void;
}