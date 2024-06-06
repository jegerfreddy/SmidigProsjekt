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
        };
    };

    const verifyUser = async (userId, code) => {
        try {
            const result = await axios.post(`${API_EXTERNAL_BASE_URL}/verify/${userId}/${code}`);
            return result.data;
        } catch (error) {
            console.error(`Error verifying user`, error);
            throw error;
        };
    };

    // Used to fetch all avatars selected, to be displayed in the waiting lobby
    const getAll = async () => {
        try {
            const result = await axios.get(`${API_EXTERNAL_BASE_URL}/${controller}/all`);
            return result.data; // Return the raw data
        } catch (error) {
            console.error(`Error getting items from ${controller}`, error);
            throw error;
        };
    };

    return {
        getById,
        post,
        verifyUser,
        getAll
    };
};

module.exports = {
    ActEventService: GetService('actEvent'),
    UserService: GetService('user'),
    VoteService: GetService('vote'),
    ResultService: GetService('vote/percentage'),
    WinnerService: GetService('vote/winner'),
    VerifyService: GetService('verify'),
    FeedBackService: GetService('feedback')
};
