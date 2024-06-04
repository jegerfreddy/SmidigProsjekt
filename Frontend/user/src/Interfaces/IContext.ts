import { IService } from "./IService";

export interface IGeneralContext<T> {
    items: T[];
    loading: boolean;
    error: string | null;
    getById: (id: number) => Promise<T>;
    postItem: (newItem: T) => Promise<void>;
    vertifyUser: (userId: string, code: string) =>Promise<boolean>;

  }


export interface IGeneralProviderProps<T> {
  children: React.ReactNode;
  service: IService<T>;
}