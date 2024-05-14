const jwt = require('jsonwebtoken');
require('dotenv').config();

// Auth middleware
exports.auth = (req, res, next) => {
    try {
        // Extract JWT token
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token missing',
            });
        }

        // Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log(req.user);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token ⚠️',
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Error occurred in authentication ⚠️',
        });
    }
};
