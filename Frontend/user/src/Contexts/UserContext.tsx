import { createContext, useEffect, useState } from "react";
import { IGeneralContext, IGeneralProviderProps } from "../Interfaces/IContext";


export const GeneralContext = createContext<IGeneralContext<any> | null>(null);

export const GeneralProvider = <T extends {}>({
  children,
  service,
}: IGeneralProviderProps<T>) => {
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const getAllItemsFromService = async (): Promise<{ items: T[] }> => {
        try {
      setLoading(true);
      const itemsFromService = await service.getAll();
      if (itemsFromService.items) {
        setItems(itemsFromService.items);
        return { items: itemsFromService.items };
      } else {
        return { items: [] };
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Error fetching items. Please try again later.");
      return { items: [] };
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id: number): Promise<any> => {
    try {
      const itemToUpdate = await service.getById(id);
      return itemToUpdate;
    } catch (error) {
      console.error(`Error fetching item with ID ${id}: ${error}`);
    }
  };

  const getByName = async (name: string): Promise<any> => {
    try {
      const itemToUpdate = await service.getByName(name);
      return itemToUpdate;
    } catch (error) {
      console.error(`Error fetching item with name ${name}: ${error}`);
    }
  };

  const editItem = async (itemToUpdate: any): Promise<void> => {
    try {
      await service.put(itemToUpdate);
      getAllItemsFromService();
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  useEffect(() => {
    getAllItemsFromService();
  }, []);

  const contextValue: IGeneralContext<T> = {
    items,
    loading,
    error,
    getAllItemsFromService,
    getById,
    getByName,
    editItem,
  };
  return (
    <GeneralContext.Provider value={contextValue}>
      {children}
    </GeneralContext.Provider>
  );
};