const axios = require('axios');

const API_EXTERNAL_BASE_URL = 'http://localhost:8080/api';

const GetService = (controller) => {
    const getById = async (id) => {
        try {
            const result = await axios.get(`${API_EXTERNAL_BASE_URL}/${controller}/id/${id}`);
            return result.data;
        } catch (error) {
            console.error(`Error getting item by ID from ${controller}`, error);
            throw error;
        }
    };

    const post = async (data) => {
        try {
            const result = await axios.post(`${API_EXTERNAL_BASE_URL}/${controller}/new`, data);
            return result.data;
        } catch (error) {
            console.error(`Error posting item to ${controller}`, error);
            throw error;
        }
    };

    const verifyUser = async (userId, code) => {
        try {
            const result = await axios.post(`${API_EXTERNAL_BASE_URL}/verify/${userId}/${code}`);
            return result.data;
        } catch (error) {
            console.error(`Error verifying user`, error);
            throw error;
        }
    };

    const getAll = async () => {
        try {
            const result = await axios.get(`${API_EXTERNAL_BASE_URL}/${controller}/all`);
            return result.data;
        } catch (error) {
            console.error(`Error getting items from ${controller}`, error);
            throw error;
        }
    };

    const createAct = async (actName, events) => {
        console.log('Creating new act:', actName, events);
    
        const data = {
            actName: actName
        };
    
        try {
            const res = await axios.post(`${API_EXTERNAL_BASE_URL}/act/new`, data);
            const newActId = res.data.actID;
            console.log('New Act ID:', newActId);
    
            for (let i = 0; i < events.length; i++) {
                await axios.post(`${API_EXTERNAL_BASE_URL}/actEvent/new/link/${newActId}`, events[i]);
            }
            
            return newActId;
    
        } catch (error) {
            console.error('Error occurred while creating act and events:', error);
            throw new Error('Failed to create act and events');
        }
    };

    return {
        getById,
        post,
        verifyUser,
        getAll,
        createAct
    };
};

module.exports = {
    EventService: GetService('actEvent'),
    UserService: GetService('user'),
    VoteService: GetService('vote'),
    ResultService: GetService('vote/percentage'),
    WinnerService: GetService('vote/winner'),
    VerifyService: GetService('verify'),
    FeedBackService: GetService('feedback')
};
