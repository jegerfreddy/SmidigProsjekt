const express = require('express');
const cors = require('cors');
const axios = require('axios');
const websocketServer = require('./websocket');
const {

    UserService, VerifyService, ActEventService,
    ResultService, WinnerService, VoteService

} = require('./services/service');

// SETUP EXPRESS SERVER

const app = express();
const allowedOrigins = [
    "http://localhost:5173",
    "ws://localhost:5173",
    "http://localhost:5174",
    "ws://localhost:5174",
    "http://localhost:3000"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET, POST, PUT'
}));

app.use(express.json());


//  SERVER ENDPOINTS

// Add user to database
app.post("/api/user/new", async (req, res) => {

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

// HTTP endpoint for creating a new vote
app.post("/api/vote/new", async (req, res) => {

    const newVote = req.body;

    try {

        const result = await VoteService.post(newVote);

        console.log('New vote received and forwarded:', result);
        res.status(201).json(result);

    } catch (error) {

        console.error('Error occurred while forwarding new vote data:', error);
        res.status(500).json({ error: 'Failed to create vote' });
    };
});

// HTTP endpoint for verifying a user
app.post("/api/verify/:userId/:code", async (req, res) => {

    const { userId, code } = req.params;

    try {

        const result = await VerifyService.verifyUser(userId, code);

        console.log('User verification status:', result);
        res.status(200).json(result);

    } catch (error) {

        console.error('Error occurred while verifying user:', error);
        res.status(500).json({ error: 'Failed to verify user' });
    };
});

// HTTP endpoint for getting act event by ID
app.get("/api/actEvent/id/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const result = await ActEventService.getById(id);

        console.log('Act event received:', result);
        res.status(200).json(result);
        
    } catch (error) {

        console.error('Error occurred while fetching act event:', error);
        res.status(500).json({ error: 'Failed to fetch act event' });
    };
});

// HTTP endpoint for getting result by ID
app.get("/api/vote/percentage/id/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const result = await ResultService.getById(id);

        console.log('Vote percentage received:', result);
        res.status(200).json(result);

    } catch (error) {

        console.error('Error occurred while fetching vote percentage:', error);
        res.status(500).json({ error: 'Failed to fetch vote percentage' });
    }
});

// HTTP endpoint for getting winner by ID
app.get("/api/vote/winner/id/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const result = await WinnerService.getById(id);

        console.log('Winner received:', result);
        res.status(200).json(result);

    } catch (error) {

        console.error('Error occurred while fetching winner:', error);
        res.status(500).json({ error: 'Failed to fetch winner' });
    }
});

// HTTP endpoint for getting all users
app.get("/api/user/all", async (req, res) => {
    
    try {

        const result = await UserService.getAll();

        console.log('Users received:', result);
        res.status(200).json(result);

    } catch (error) {

        console.error('Error occurred while fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Additional endpoints
app.post("/api/loginAdmin", async (req, res) => {    

    const { username, password } = req.body;
    const data = { username, password };

    try {

        const dbRes = await axios.post('http://localhost:8080/api/adminUser/loginAdmin', data);
        res.send(dbRes.data);

    } catch (error) {

        console.error('Error occurred during admin login:', error.message);
        res.status(500).json({ error: 'Failed to login admin' });
    };
});

app.get("/api/getActs", async (req, res) => {

    try {

        const dbRes = await axios.get("http://localhost:8080/api/act/all");
        res.send(dbRes.data);

    } catch (error) {

        console.error('Error occurred while fetching acts:', error);
        res.status(500).json({ error: 'Failed to fetch acts' });

    };
});

app.get("/api/getEvents", async (req, res) => {

    try {

        const dbRes = await axios.get("http://localhost:8080/api/actEvent/all");
        res.send(dbRes.data);

    } catch (error) {

        console.error('Error occurred while fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    };
});

app.post("/api/updateEvent", async (req, res) => {

    const data = req.body;

    try {

        await axios.put("http://localhost:8080/api/actEvent/update", data);
        res.send();

    } catch (error) {

        console.error('Error occurred while updating event:', error);
        res.status(500).json({ error: 'Failed to update event' });
    };
});

const httpServer = app.listen(4000, () => {

    console.log('HTTP server running on http://localhost:4000');

});

// Initialize WebSocket server
websocketServer();
