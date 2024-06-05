import { createContext, useCallback, useState } from "react";
import { IGeneralContext, IGeneralProviderProps } from "../Interfaces/IContext";

export const GeneralContext = createContext<IGeneralContext<any> | null>(null);

export const GeneralProvider = <T extends {}>({
  children,
  service,
}: IGeneralProviderProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getById = useCallback(async (id: number): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      const { item } = await service.getById(id);
      return item;
    } catch (error) {
      console.error(`Error fetching item with ID ${id}:`, error);
      setError('Failed to fetch item');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const postItem = useCallback(async (newItem: T): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await service.post(newItem);
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Failed to add item');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const vertifyUser = useCallback(async (userId: string, code: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.vertifyUser(userId, code);
      return result;
    } catch (error) {
      console.error('Error verifying user:', error);
      setError('Failed to verify user');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const contextValue: IGeneralContext<T> = {
    items,
    loading,
    error,
    getById,
    postItem,
    vertifyUser,
  };

  return (
    <GeneralContext.Provider value={contextValue}>
      {children}
    </GeneralContext.Provider>
  );
};
