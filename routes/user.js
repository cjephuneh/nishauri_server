const express = require('express');
const router = express.Router();

// Handlers from controllers
const { login, signup } = require('../controllers/auth');
// const { auth } = require('../middlewares/authMiddle');

router.post('/login', login);
router.post('/signup', signup);

// Testing protected route
// router.get('/test', auth, (req, res) => {
//     res.json({
//         success: true,
//         message: 'You are a valid tester 👨‍💻',
//     });
// });

module.exports = router;
