export interface IWinner {
    length(length: any): unknown;
    opton1: number;
    option2?: number;
    option3?: number;
    option4?: number;
};



export interface WinnerItemProps {
    length: any;
    result: IWinner;
  }