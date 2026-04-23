const { tbc_Usuario } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {

    // 🔐 SOLO ADMIN
   create(req, res) {

    // Registro público
    if (!req.user) {
        req.body.rol = 'cliente';
        req.body.fecha_registro = new Date();

        return tbc_Usuario.create(req.body)
            .then(usuario => res.status(201).send(usuario))
            .catch(error => res.status(400).send(error));
    }

    // Si hay sesión pero no es admin
    if (req.user.rol !== 'admin') {
        return res.status(403).send({
            message: 'Solo admin puede crear usuarios desde panel'
        });
    }

    // Admin sí puede crear
    return tbc_Usuario.create(req.body)
        .then(usuario => res.status(201).send(usuario))
        .catch(error => res.status(400).send(error));
},

    // 🔐 SOLO ADMIN
    list(req, res) {
        if (!req.user || req.user.rol !== 'admin') {
            return res.status(403).send({ message: 'Solo admin puede ver usuarios' });
        }

        return tbc_Usuario.findAll()
            .then(usuarios => res.status(200).send(usuarios))
            .catch(error => res.status(400).send(error));
    },

    // 🔐 ADMIN o EL MISMO USUARIO
    find(req, res) {
        if (!req.user) {
            return res.status(401).send({ message: 'No autenticado' });
        }

        if (req.user.rol !== 'admin' && req.user.id != req.params.id) {
            return res.status(403).send({ message: 'No autorizado' });
        }

        return tbc_Usuario.findByPk(req.params.id)
            .then(usuario =>
                usuario
                    ? res.status(200).send(usuario)
                    : res.status(404).send({ message: 'No encontrado' })
            )
            .catch(error => res.status(400).send(error));
    },

    // 🔐 ADMIN o EL MISMO USUARIO
    update(req, res) {
        if (!req.user) {
            return res.status(401).send({ message: 'No autenticado' });
        }

        if (req.user.rol !== 'admin' && req.user.id != req.params.id) {
            return res.status(403).send({ message: 'No autorizado' });
        }

        return tbc_Usuario.findByPk(req.params.id)
            .then(usuario => {
                if (!usuario) {
                    return res.status(404).send({ message: 'No encontrado' });
                }

                return usuario.update(req.body)
                    .then(updated => res.status(200).send(updated));
            })
            .catch(error => res.status(400).send(error));
    },

    // 🔐 SOLO ADMIN
    delete(req, res) {
        if (!req.user || req.user.rol !== 'admin') {
            return res.status(403).send({ message: 'Solo admin puede eliminar usuarios' });
        }

        return tbc_Usuario.findByPk(req.params.id)
            .then(usuario => {
                if (!usuario) {
                    return res.status(404).send({ message: 'No encontrado' });
                }

                return usuario.destroy()
                    .then(() => res.status(204).send());
            })
            .catch(error => res.status(400).send(error));
    },

    // 🔓 LOGIN (LIBRE)
    login(req, res) {
        const { email, password } = req.body;

        return tbc_Usuario.findOne({
            where: {
                email,
                password
            }
        })
        .then(usuario => {
            if (!usuario) {
                return res.status(401).send({
                    message: 'Credenciales incorrectas'
                });
            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email,
                    rol: usuario.rol
                },
                'secreto123',
                { expiresIn: '1h' }
            );

            return res.status(200).send({
                token
            });
        })
        .catch(error => res.status(400).send(error));
    }
};