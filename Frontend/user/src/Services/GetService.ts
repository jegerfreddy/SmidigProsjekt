import axios from "axios";
import { IService } from "../Interfaces/IService";
import {  IActEvent } from "../Interfaces/IAct";


const GetService = <T>(controller: string) => {

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



  return {
    getById,
   
  } as IService<T>;
};

/* export const ActService = GetService<IAct>(
    "http://localhost:8080/api/act"
    ); */
export const ActEventService = GetService<IActEvent>(
    "http://localhost:8080/api/actEvent"
    );
/* export const UserService = GetService<IUser>(
    "http://localhost:8080/api/user"
    ); */