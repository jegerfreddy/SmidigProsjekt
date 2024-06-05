const axios = require('axios');

const API_BASE_URL = 'http://localhost:8080/api';

const GetService = (controller) => {
    const getById = async (id) => {
        try {
            const result = await axios.get(`${API_BASE_URL}/${controller}/id/${id}`);
            return result.data;
        } catch (error) {
            console.error(`Error getting item by ID from ${controller}`, error);
            throw error;
        }
    };

    const post = async (data) => {
        try {
            const result = await axios.post(`${API_BASE_URL}/${controller}/new`, data);
            return result.data;
        } catch (error) {
            console.error(`Error posting item to ${controller}`, error);
            throw error;
        }
    };

    const verifyUser = async (userId, code) => {
        try {
            const result = await axios.post(`${API_BASE_URL}/verify/${userId}/${code}`);
            return result.data;
        } catch (error) {
            console.error(`Error verifying user with verify`, error);
            throw error;
        }
    };

    return {
        getById,
        post,
        verifyUser
    };
};

module.exports = {
    ActEventService: GetService('actEvent'),
    UserService: GetService('user'),
    VoteService: GetService('vote'),
    ResultService: GetService('vote/percentage'),
    WinnerService: GetService('vote/winner'),
    VerifyService: GetService('verify'),
    FeedbackService: GetService('feedback')
};
