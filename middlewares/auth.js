const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send({ message: 'No hay token' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'secreto123', (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Token inválido' });
        }

        req.user = decoded; // 👈 aquí queda id, email, tipo
        next(); // 👈 deja pasar al controller
    });
};