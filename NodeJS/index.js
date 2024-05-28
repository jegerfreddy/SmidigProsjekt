const {checkAdminLogin} = require("./Services/DatabaseService");
const express = require("express");
const cors = require('cors');

// SERVER SETUP - START

const allowedOrigins = [
    "http://localhost:5173",
    "ws://localhost:5173",
    "http://localhost:5174",
    "ws://localhost:5174",
    "http://localhost:3000"
];
const app = express();

app.use(express.json())

app.use(cors({
    origin: function (origin, callback) {

        // Check if the origin is allowed or if it's a browser's preflight request (OPTIONS method)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        };
    },
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET, POST'
}));

// SERVER SETUP - END

app.post('/LoginAdmin', async (req, res) => {

    checkAdminLogin(req.body.username, req.body.password)
        .then((isValid) => {
            
            if (isValid) {
                res.send(isValid);
            } else {
                res.send(isValid);
            };

        });
});


app.listen(3000, () => {

    console.log("Listening on PORT 3000");

});