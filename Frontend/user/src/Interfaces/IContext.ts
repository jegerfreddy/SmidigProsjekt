import { IService } from "./IService";

export interface IGeneralContext<T> {
    items: T[];
    loading: boolean;
    error: string | null;
    getAllItemsFromService: () => Promise<{ items: T[] }>;
    getById: (id: number) => Promise<T>;
    getByName: (name: string) => Promise<T>;
    editItem: (itemToUpdate: any) => Promise<void>;
  }


export interface IGeneralProviderProps<T> {
  children: React.ReactNode;
  service: IService<T>;
}