const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')

mongoose.connect(config.database, { useUnifiedTopology: true , useNewUrlParser: true });

mongoose.connection.on('DB connected', () => {
    console.log('DB connected successfully ' + config.database)
});

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

app.use('/users', users);

app.get('/', (req,res) => {
    res.send('Wrong Endpoint');
});

app.listen(port, () => {
    console.log('Server is working the port is ' + port);
});