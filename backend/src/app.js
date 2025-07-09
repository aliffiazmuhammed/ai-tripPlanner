const express = require ("express")
const cors = require('cors')
const airoutes = require('./Routes/ai-route')

const app = express();

app.use(express.json())

app.use(cors({
    origin: '*',  // Allow local frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send("hello world")
})

app.use('/ai', airoutes)

module.exports = app;