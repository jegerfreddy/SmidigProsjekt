import axios from "axios";
import { IService } from "../Interfaces/IService";
import {  IActEvent } from "../Interfaces/IAct";
import { IUser } from "../Interfaces/IUser";
import { IVote } from "../Interfaces/IVoting";
import { IResult } from "../Interfaces/IResult";
import { IFeedBack } from "../Interfaces/IFeedBack";


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


  const post = async <T,>(data: T): Promise<{ result: T }> => {
    try {
        const result = await axios.post(`${controller}/new`, data);
        const postResult = result.data;
        console.log(`Posted item to ${controller}`, postResult);
        return { result: postResult };
    } catch (error) {
        console.log(`Error posting item to ${controller}`, error);
        throw error;
    }
};


  return {
    getById,
    post,
   
  } as IService<T>;
};

/* export const ActService = GetService<IAct>(
    "http://localhost:8080/api/act"
    ); */
  
export const ActEventService = GetService<IActEvent>(
    "http://localhost:8080/api/actEvent"
    );
export const UserService = GetService<IUser>(
    "http://localhost:8080/api/user"
    );

export const VoteService = GetService<IVote>(
  "http://localhost:8080/api/vote"
  );

export const ResultService = GetService<IResult>(
  "http://localhost:8080/api/vote/percentage"
  );
export const FeedBackService = GetService<IFeedBack>(
  "http://localhost:8080/api/feedback"
  );