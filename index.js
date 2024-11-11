const pool = require("./connectDB");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors(
    {
        origin: "*",
        methods: ['GET', 'POST', 'OPTIONS'],
    }
));
app.use(bodyParser.json());

app.options('*', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
    });
    res.sendStatus(200);
});

app.post('/insert_message', async (req, res) => {
    try {
        const { message } = req.body;
        await pool.query("INSERT INTO messages (message) VALUES($1)", [message]);
        res.json("Message was sent").status(200);
    } catch (err) {
        res.json(err.message).status(500);
    }
});

app.get('/get_messages', async (req, res) => {
    try {
        const messages = await pool.query("SELECT * FROM messages");
        res.json(messages.rows).status(200);
    } catch (err) {
        res.json(err.message).status(500);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});