const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(403).json({ message: 'Token is required' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.user = await User.findById(decoded.id);
        next();
    });
};

