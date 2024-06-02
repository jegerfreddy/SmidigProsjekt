export interface IService<T> {
  getById: (id: number) => Promise<{ item: T }>;
  post: (data: T) => Promise<{ result: T }>;


  }