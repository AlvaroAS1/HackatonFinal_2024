const validationMiddleware = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
    }

    next(); // Pasar al siguiente middleware o controlador
};

module.exports = validationMiddleware;
