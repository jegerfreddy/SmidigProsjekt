const express = require('express');
const cors = require('cors');
const axios = require('axios');
const websocketServer = require('./websocket');
const {

    UserService, VerifyService, EventService,
    ResultService, WinnerService, VoteService, FeedBackService

} = require('./services/service');
const e = require('express');

// SETUP EXPRESS SERVER

const app = express();
const allowedOrigins = [
    "http://localhost:5173",
    "ws://localhost:5173",
    "http://localhost:5174",
    "ws://localhost:5174",
    "http://localhost:5175",
    "ws://localhost:5175",
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
// Endpoint for creating a new act and associated events
app.post("/api/createAct", async (req, res) => {
    const { actName, events } = req.body;

    try {
        const newActId = await EventService.createAct(actName, events);
        res.status(201).json({ actID: newActId });
    } catch (error) {
        console.error('Error occurred while creating act and events:', error);
        res.status(500).json({ error: 'Failed to create act and events' });
    }
});

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

        const result = await EventService.getById(id);

        console.log('Act event received:', result);
        res.status(200).json(result);
        
    } catch (error) {

        console.error('Error occurred while fetching act event:', error);
        res.status(500).json({ error: 'Failed to fetch act event' });
    };
});

// HTTP endpoint for event option with most votes
app.get("/api/winningEvent/:actEventId/new", async (req, res) => {
        const  actEventId  = req.params.actEventId;
    
        try {
            const response = await axios.get(`http://localhost:8080/api/actEvent/next/${actEventId}`);
            res.status(200).json(response.data);
        } catch (error) {
            console.error("Error linking events:", error);
            res.status(500).json({ error: 'Failed to link events' });
        }
    });
// HTTP endpoint for getting event of minigame winner
app.get("/api/actEvent/next/:actEventId/:option", async (req, res) => {
        const  actEventId  = req.params.actEventId;
        const  option  = req.params.option;
    
        try {
            const response = await axios.get(`http://localhost:8080/api/actEvent/next/${actEventId}/${option}`);
            res.status(200).json(response.data);
        } catch (error) {
            console.error("Error linking events:", error);
            res.status(500).json({ error: 'Failed to link events' });
        }
    });

//HTTP endpoint for linking events
app.put("/api/LinkEvent/next", async (req, res) => {
    const { actEventID, option, nextEventID } = req.body;

    try {
        const response = await axios.put(`http://localhost:8080/api/actEvent/next/${actEventID}/${option}/${nextEventID}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error linking events:", error);
        res.status(500).json({ error: 'Failed to link events' });
    }
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
app.get("/api/adminUser/checkUsername/:id", async (req, res) => {
    
    const { id } = req.params;

    try {
        
        await axios.get(`http://localhost:8080/api/adminUser/checkUsername/${id}`)
            .then((response) => {
                res.send(response.data);
            })
        ;

    } catch (error) {
        
        console.log(error);

    };
});

app.post("/api/addNewAdmin", async (req, res) => {
    
    const newAdmin = req.body;

    console.log(newAdmin);

    await axios.post("http://localhost:8080/api/adminUser/new", newAdmin)
        .then((response) => {
            if (response.status == 200) {

                res.status(200).send();

            }
        })
    ;

})

app.put("/api/updateAdmin", async (req, res) => {
    const data = req.body;

    try {
        
        axios.put("http://localhost:8080/api/adminUser/update", data);

    } catch (error) {
        
        console.log(error);

    };
})

app.post("/api/loginAdmin", async (req, res) => {    

    const data = req.body;

    await axios.post('http://localhost:8080/api/adminUser/loginAdmin', data)
        .then((response) => {
                  
            res.send(JSON.stringify(response.data));

        })
        
        .catch((response) => {

            res.status(401).send(response);

        })
    ;
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

app.get("/api/getGameCodes/:amount", (req, res) => {

    const { amount } = req.params;

    axios.get(`http://localhost:8080/api/verify/generate/${amount}`)
        .then((response) => {
            res.send(response.data);
        })

        .catch((response) => {
            res.sendStatus(500);
            console.log(response);
        })
})

app.get("/api/getEvents", async (req, res) => {

    try {

        const dbRes = await axios.get("http://localhost:8080/api/actEvent/all");
        res.send(dbRes.data);

    } catch (error) {

        console.error('Error occurred while fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    };
});

app.get("/api/getAllEventsFromAct/:id", async (req, res) => {
    const { id } = req.params;

    try {

        const dbRes = await axios.get(`http://localhost:8080/api/actEvent/act/${id}`);
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

// HTTP endpoint for creating new feedback
app.post("/api/feedback/new", async (req, res) => {
    const newFeedback = req.body;
    try {
        const result = await FeedBackService.post(newFeedback);
        console.log('New feedback received and forwarded:', result);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error occurred while forwarding new feedback data:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to create feedback', details: error.message });
    }
});


const httpServer = app.listen(4000, () => {

    console.log('HTTP server running on http://localhost:4000');

});

// Initialize WebSocket server
websocketServer();
