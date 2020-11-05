const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');
const Person = require('../models/People');


//@route GET api/contacts
//@desc Get all Contacts
//@access Private 
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});


// @route   POST api/contacts
// @desc    ADD new contact
// @access  Public
router.post('/', async (req, res) => {

    const { name, organization, position } = req.body;

    console.log(`from back end req.body${name}, ${organization}, ${position}`);

    try {
        const newPerson = new Person({
            name, organization, position
        });

        console.log(`from backend, newPerson: ${newPerson.name}`);

        const person = await newPerson.save();
        res.json(person);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("THIS IS SERVER ERROR");
    }
});



// @route   PUT api/contacts/:id
// @desc    Update Contact
// @access   Private
router.put('/:id', (req, res) => {
    res.send('Update Contact');
})

// @route   DELETE api/contacts/:id
// @desc    Delete Contact
// @access  Private
router.delete('/:id', (req, res) => {
    res.send('Delete Contact');
})

module.exports = router;