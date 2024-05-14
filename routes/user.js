const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/auth');
const { auth } = require('../middlewares/authMiddle');
const { getUserProfile } = require('../controllers/userController'); // Import the getUserProfile controller function

router.post('/login', login);
router.post('/signup', signup);

// Add the new route for fetching user profile
router.get('/profile', auth, getUserProfile); // Use the auth middleware to protect this route

module.exports = router;