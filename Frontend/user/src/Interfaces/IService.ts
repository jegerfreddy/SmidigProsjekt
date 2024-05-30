export interface IService<T> {
    getAll: () => Promise<{ items: T[] }>;
    getById: (id: number) => Promise<{ item: T }>;
    getByName: (name: string) => Promise<{ item: T }>;
    put: (data: T) => Promise<{ result: T }>;
  }