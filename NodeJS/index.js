const axios = require("axios");
const express = require("express");
const cors = require('cors');

//---------------------
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
//-------------------

app.post('/LoginAdmin', async (req, res) => {

    const data = {
        username: req.body.username,
        password: req.body.password
    }

    await axios.post('http://localhost:8080/api/adminUser/loginAdmin', data)
    .then((dbRes) => {

        if (dbRes.data) {

            res.send(dbRes.data);

        } else {

            res.send(dbRes.data);

        };
    });
});

app.get("/getActs", async (req, res) => {

    await axios.get("http://localhost:8080/api/act/all")
    .then((dbRes) => {
        res.send(dbRes.data);
    })

});

app.get("/getEvents", async (req, res) => {

    await axios.get("http://localhost:8080/api/actEvent/all")
    .then((dbRes) => {
        res.send(dbRes.data);
    })

});

app.post("/updateEvent", async (req, res) => {

    const data = req.body

    await axios.put("http://localhost:8080/api/actEvent/update", data)
        .then(() => {
            res.send();
        })

});

app.listen(3000, () => {


    console.log("Listening on PORT 3000");

});