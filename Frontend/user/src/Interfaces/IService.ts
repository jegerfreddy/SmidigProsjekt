export interface IService<T> {
  getById: (id: number) => Promise<{ item: T }>;
  post: (data: T) => Promise<{ result: T }>;
  getAll: () => Promise<{ items: T[] }>; // Legg til denne linjen
}
