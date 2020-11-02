const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');


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
// @access Private
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, organization, position } = req.body;

    try {
        const newContact = new Contact({
            name, organization, position, user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);
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