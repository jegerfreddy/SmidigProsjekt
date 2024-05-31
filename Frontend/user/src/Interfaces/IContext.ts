import { IService } from "./IService";

export interface IGeneralContext<T> {
    items: T[];
    loading: boolean;
    error: string | null;
    getById: (id: number) => Promise<T>;
  }


export interface IGeneralProviderProps<T> {
  children: React.ReactNode;
  service: IService<T>;
}