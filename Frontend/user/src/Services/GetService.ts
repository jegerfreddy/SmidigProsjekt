import axios from 'axios';
import { IService } from '../Interfaces/IService';
import { IActEvent } from '../Interfaces/IAct';
import { IUser } from '../Interfaces/IUser';
import { IVote } from '../Interfaces/IVoting';
import { IResult } from '../Interfaces/IResult';
import { IWinner } from '../Interfaces/IWinner';
import { IVertify } from '../Interfaces/IVertify';
import { IFeedBack } from '../Interfaces/IFeedBack';

const API_BASE_URL = 'http://localhost:4000/api';

const GetService = <T>(controller: string) => {
    const getById = async (id: number): Promise<{ item: T }> => {
        try {
            const result = await axios.get(`${API_BASE_URL}/${controller}/id/${id}`);
            const items = result.data;
            return items;
        } catch (error) {
            console.log(`Error getting item by ID from ${controller}`, error);
            throw error;
        }
    };
//as
    const post = async (data: T): Promise<{ result: T }> => {
        try {
            const result = await axios.post(`${API_BASE_URL}/${controller}/new`, data);
            return { result: result.data };
        } catch (error) {
            console.log(`Error posting item to ${controller}`, error);
            throw error;
        }
    };

    const verifyUser = async (userId: string, code: string): Promise<boolean> => {
        try {
            const result = await axios.post(`${API_BASE_URL}/verify/${userId}/${code}`);
            return result.data;
        } catch (error) {
            console.log(`Error verifying user in ${controller}`, error);
            throw error;
        }
    };

        //Denne brukes til å hente avatarer som er valgt, skal vises i waitingLobby
     const getAll = async (): Promise<{ items: IUser[] }> => {
        try {
            const result = await axios.get(`${API_BASE_URL}/${controller}/all`);
           const items = result.data;
           return { items };
       } catch (error) {
           console.log(`Error getting items from ${controller}`, error);
           throw error;
       }
    };

    return {
        getById,
        post,
        verifyUser,
        getAll
    } as IService<T>;
};

export const ActEventService = GetService<IActEvent>('actEvent');
export const UserService = GetService<IUser>('user');
export const VoteService = GetService<IVote>('vote');
export const ResultService = GetService<IResult>('vote/percentage');
export const WinnerService = GetService<IWinner>('vote/winner');
export const VerifyService = GetService<IVertify>('verify');
export const FeedBackService = GetService<IFeedBack>('feedback');
