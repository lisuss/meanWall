const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

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
    const username = req.body.username;
    const password = req.body.password;
    

    User.getUserByUserName(username, (err, user) => {
        if (err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if(isMatch) {
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        username: user.username
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong email or password'});
            }
        });
    })
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});



module.exports = router;