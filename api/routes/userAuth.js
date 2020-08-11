// Description: User Authorization route
// Author: AshwinSathian

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//  Login Route
router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email.trim().toLowerCase() })
    .then(user => {
        if(!user) {
            const user = new User({
                email: req.body.email.trim().toLowerCase()
            });
            user.save()
            .then(result => {
                console.log('oooo');
                return res.status(201).json({
                    message: 'New User Created',
                    result: result
                });
            })
        }else {
            console.log('ttttttt');
            return res.status(200).json({
                user
              });
        }
        
        
    })
    
  });

module.exports = router;