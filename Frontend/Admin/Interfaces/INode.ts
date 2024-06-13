export interface ConnectionData {
    sourceEvent: string | null;
    optionNumber: string | undefined;
    targetEvent: string | null;
  }

export type NodeData = {
    title: string;
    actID: number;
    options: (string | undefined)[];
    width?: number; 
    height?: number; 
  };