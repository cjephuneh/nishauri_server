const bcrypt = require('bcrypt');
const user = require('../models/userModel');

// Signup handler
exports.signup = async (req, res) => {
    try {
        // Get input data
        const { name, email, password, role } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(403).send({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // Secure password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const User = await user.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        return res.status(200).json({
            success: true,
            User,
            message: 'User created successfully ✅',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User registration failed',
        });
    }
};

// Login handler
exports.login = async (req, res) => {
    try {
        // Data fetch
        const { email, password } = req.body;

        // Validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the details carefully',
            });
        }

        // Check for registered user
        let User = await user.findOne({ email });

        // If user not registered or not found in database
        if (!User) {
            return res.status(401).json({
                success: false,
                message: 'You have to sign up first',
            });
        }

        // Verify password
        if (await bcrypt.compare(password, User.password)) {
            // If password matched
            return res.status(200).json({
                success: true,
                User,
                message: 'Logged in successfully ✅',
            });
        } else {
            // Password do not matched
            return res.status(403).json({
                success: false,
                message: 'Password incorrect ⚠️',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Login failure ⚠️ :' + error,
        });
    }
};
