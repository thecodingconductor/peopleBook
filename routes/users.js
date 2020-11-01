const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

//@route POST api/users
//@desc Register a user
//@access Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //pull out name, email, and password from the request body
    const { name, email, password } = req.body;

    try {

        //search database for users with matching email
        let user = await User.findOne({ email });

        //if user exists, return error. needs a diff email.
        if (user) {
            return res.status(400).json({ msg: "User already exists" })
        }

        //Make instance of User
        user = new User({
            name,
            email,
            password
        });

        //Create bcrypt salt
        const salt = await bcrypt.genSalt(10);

        //encrpyt password
        user.password = await bcrypt.hash(password, salt);

        //Save user to DB
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

module.exports = router;