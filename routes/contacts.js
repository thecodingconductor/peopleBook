const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');
const Organization = require('../models/Organization');

//@route GET api/contacts
//@desc Get all Contacts
//@access Public 
