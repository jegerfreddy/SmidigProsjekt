import axios from "axios";
import { IService } from "../Interfaces/IService";
import { IAct, IActEvent } from "../Interfaces/IAct";
import { IUser } from "../Interfaces/IUser";


const GetService = <T>(controller: string) => {
  const getAll = async (): Promise<{ items: T[] }> => {
    try {
      const result = await axios.get(controller);
      const items = result.data.items || result.data;
      return { items };
    } catch (error) {
      console.log(`Error getting all items from ${controller}`, error);
      throw error;
    }
  };

  const getById = async (id: number): Promise<{ item: T }> => {
    try {
      const result = await axios.get(`${controller}/id/${id}`);
      const item = result.data;
      return item;
    } catch (error) {
      console.log(`Error getting item by ID from ${controller}`, error);
      throw error;
    }
  };

  const getByName = async (name: string): Promise<{ item: T }> => {
    try {
      const result = await axios.get(`${controller}/grandPrix/${name}`);
      const item = result.data;
      return item;
    } catch (error) {
      console.log(`Error getting item by name from ${controller}`, error);
      throw error;
    }
  };

  const put = async (data: T): Promise<{ result: T }> => {
    try {
      const result = await axios.put(controller, data);
      const putResult = result.data;
      return { result: putResult };
    } catch (error) {
      console.log(`Error editing item at ${controller}`, error);
      throw error;
    }
  };



  return {
    getAll,
    getById,
    getByName,
    put,
  } as IService<T>;
};

export const ActService = GetService<IAct>(
    "http://localhost:8080/api/act"
    );
export const ActEventService = GetService<IActEvent>(
    "http://localhost:8080/api/actevent"
    );
export const UserService = GetService<IUser>(
    "http://localhost:8080/api/user"
    );