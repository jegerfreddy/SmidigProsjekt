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
    


    const getById = async (id: number): Promise<any> => {
      try {
        const itemToUpdate = await service.getById(id);
        return itemToUpdate;
      } catch (error) {
        console.error(`Error fetching item with ID ${id}: ${error}`);
      }
    };

    const postItem = async (newItem: T): Promise<void> => {
      try {
        await service.post(newItem);
      } catch (error) {
        console.error("Error adding item:", error);
      }
    };

  const contextValue: IGeneralContext<T> = {
    items,
    loading,
    error,
    getById,
    postItem,
  };
  return (
    <GeneralContext.Provider value={contextValue}>
      {children}
    </GeneralContext.Provider>
  );
};