const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Organization = require('../models/Organization');

//@route GET api/organizations
// @desc Get all Organizations
//@access Private

router.get('/', auth, async (req, res) => {
    try {
        const organizations = await Organization.find({ user: req.user.id }).sort({ name: -1 })
        res.json(organizations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;