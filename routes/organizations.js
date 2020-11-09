const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
// const orgData = require('../organizations.json');
// console.log(orgData[2]);
// console.log(typeof orgData);

// for (let i = 0; i < 5; i++) {
//     console.log(orgData[i]);
// }


const User = require('../models/User');
const Organization = require('../models/Organization');

//@route GET api/organizations
// @desc Get all Organizations
//@access Private

router.get('/', auth, async (req, res) => {
    try {
        const organizations = await Organization.find({})
        res.json(organizations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});




// @route POST api/organizations
// @desc  ADD Organizations
// @access Public
router.post('/', async (req, res) => {


    const { name, website, group, phone, address } = req.body;


    try {
        const newOrg = new Organization({
            name, website, group, phone, address
        });

        console.log(newOrg);

        const org = await newOrg.save();
        res.json(org);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("This was a server error")
    }

})



module.exports = router;