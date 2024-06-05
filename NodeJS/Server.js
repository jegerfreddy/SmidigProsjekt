const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');
const { UserService, VerifyService, ActEventService, ResultService, WinnerService, VoteService } = require('./services/service'); // Adjust the path according to your project structure

const app = express();

app.use(cors());
app.use(bodyParser.json());

const API_BASE_URL = '/api';

// HTTP endpoint example for creating a new user
app.post(`${API_BASE_URL}/user/new`, async (req, res) => {
    const newUser = req.body;
    try {
        const result = await UserService.post(newUser);
        console.log('New user received and forwarded:', result);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error occurred while forwarding new user data:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});
// HTTP endpoint example for creating a new user
app.post(`${API_BASE_URL}/vote/new`, async (req, res) => {
    const newVote = req.body;
    try {
        const result = await VoteService.post(newVote);
        console.log('New user received and forwarded:', result);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error occurred while forwarding new user data:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// HTTP endpoint for verifying a user
app.post(`${API_BASE_URL}/verify/:userId/:code`, async (req, res) => {
    const { userId, code } = req.params;
    try {
        const result = await VerifyService.verifyUser(userId, code);
        console.log('User verification status:', result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error occurred while verifying user:', error);
        res.status(500).json({ error: 'Failed to verify user' });
    }
});

// HTTP endpoint for getting act event by ID
app.get(`${API_BASE_URL}/actEvent/id/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ActEventService.getById(id);
        console.log('Act event received:', result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error occurred while fetching act event:', error);
        res.status(500).json({ error: 'Failed to fetch act event' });
    }
});
// HTTP endpoint for getting result by ID
app.get(`${API_BASE_URL}/vote/percentage/id/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ResultService.getById(id);
        console.log('Act event received:', result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error occurred while fetching act event:', error);
        res.status(500).json({ error: 'Failed to fetch act event' });
    }
});
app.get(`${API_BASE_URL}/vote/winner/id/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await WinnerService.getById(id);
        console.log('Act event received:', result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error occurred while fetching act event:', error);
        res.status(500).json({ error: 'Failed to fetch act event' });
    }
});

const httpServer = app.listen(4000, () => {
    console.log('HTTP server running on http://localhost:4000');
});

// Create a WebSocket server on port 3000
const wss = new WebSocket.Server({ port: 3000 });

let gameState = 'START'; // Example game state

wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
        console.log('Received:', message);

        // Handle incoming messages from the client
        const data = JSON.parse(message);

        switch (data.type) {
            case 'CHANGE_GAME_STATE':
                gameState = data.state;
                broadcastGameState(gameState);
                break;
            default:
                console.log('Unknown message type:', data.type);
        }
    });

    // Send initial game state to new connections
    ws.send(JSON.stringify({ type: 'GAME_STATE', state: gameState }));
});

const broadcastGameState = (state) => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'GAME_STATE', state }));
        }
    });
};

console.log('WebSocket server running on ws://localhost:3000');
