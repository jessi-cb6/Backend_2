const { tbb_carritos } = require('../models');

module.exports = {

    // ADMIN ve todos | CLIENTE solo su carrito
    list(req, res) {

        if (!req.user) {
            return res.status(401).send({
                message: 'No autenticado'
            });
        }

        // ADMIN
        if (req.user.rol === 'admin') {
            return tbb_carritos.findAll()
                .then(data => res.status(200).send(data))
                .catch(error => res.status(400).send(error));
        }

        // CLIENTE
        return tbb_carritos.findAll({
            where: {
                id_usuario: req.user.id
            }
        })
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    },

    find(req, res) {

        return tbb_carritos.findByPk(req.params.id)
            .then(carrito => {

                if (!carrito) {
                    return res.status(404).send({
                        message: 'Carrito no encontrado'
                    });
                }

                if (
                    req.user.rol !== 'admin' &&
                    carrito.id_usuario !== req.user.id
                ) {
                    return res.status(403).send({
                        message: 'No autorizado'
                    });
                }

                return res.status(200).send(carrito);
            })
            .catch(error => res.status(400).send(error));
    },

    create(req, res) {

        if (!req.user) {
            return res.status(401).send({
                message: 'No autenticado'
            });
        }

        if (req.user.rol !== 'admin') {
            req.body.id_usuario = req.user.id;
        }

        return tbb_carritos.create(req.body)
            .then(data => res.status(201).send(data))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {

        return tbb_carritos.findByPk(req.params.id)
            .then(carrito => {

                if (!carrito) {
                    return res.status(404).send({
                        message: 'No encontrado'
                    });
                }

                if (
                    req.user.rol !== 'admin' &&
                    carrito.id_usuario !== req.user.id
                ) {
                    return res.status(403).send({
                        message: 'No autorizado'
                    });
                }

                return carrito.update(req.body)
                    .then(data => res.status(200).send(data));
            })
            .catch(error => res.status(400).send(error));
    },

    delete(req, res) {

        return tbb_carritos.findByPk(req.params.id)
            .then(carrito => {

                if (!carrito) {
                    return res.status(404).send({
                        message: 'No encontrado'
                    });
                }

                if (
                    req.user.rol !== 'admin' &&
                    carrito.id_usuario !== req.user.id
                ) {
                    return res.status(403).send({
                        message: 'No autorizado'
                    });
                }

                return carrito.destroy()
                    .then(() => res.status(204).send());
            })
            .catch(error => res.status(400).send(error));
    }
};