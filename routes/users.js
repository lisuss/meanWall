const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.registerUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg:`Registration didn't work`});
        } else {
            res.json({success: true, msg:`Registration went correctly`});
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    res.send('Authenticate');
});

router.get('/profile', (req, res, next) => {
    res.send('Profile');
});



module.exports = router;