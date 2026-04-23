const { tbc_carrito_detalle, tbb_carritos } = require('../models');

module.exports = {

    // 🔐 ADMIN ve todo | CLIENTE solo detalles de sus carritos
    list(req, res) {

        if (!req.user) {
            return res.status(401).send({
                message: 'No autenticado'
            });
        }

        // ADMIN
        if (req.user.rol === 'admin') {

            return tbc_carrito_detalle.findAll({
                include: [{
                    model: tbb_carritos,
                    as: 'carrito'
                }]
            })
            .then(detalles => res.status(200).send(detalles))
            .catch(error => res.status(400).send(error));
        }

        // CLIENTE
        return tbc_carrito_detalle.findAll({
            include: [{
                model: tbb_carritos,
                as: 'carrito',
                where: {
                    id_usuario: req.user.id
                }
            }]
        })
        .then(detalles => res.status(200).send(detalles))
        .catch(error => res.status(400).send(error));
    },

    // 🔐 Buscar detalle por id
    find(req, res) {

        return tbc_carrito_detalle.findByPk(req.params.id, {
            include: [{
                model: tbb_carritos,
                as: 'carrito'
            }]
        })
        .then(detalle => {

            if (!detalle) {
                return res.status(404).send({
                    message: 'Detalle no encontrado'
                });
            }

            if (
                req.user.rol !== 'admin' &&
                detalle.carrito.id_usuario !== req.user.id
            ) {
                return res.status(403).send({
                    message: 'No autorizado'
                });
            }

            return res.status(200).send(detalle);
        })
        .catch(error => res.status(400).send(error));
    },

    // 🔐 Crear detalle
    create(req, res) {

        if (!req.user) {
            return res.status(401).send({
                message: 'No autenticado'
            });
        }

        return tbc_carrito_detalle.create(req.body)
            .then(detalle => res.status(201).send(detalle))
            .catch(error => res.status(400).send(error));
    },

    // 🔐 Actualizar detalle
    update(req, res) {

        return tbc_carrito_detalle.findByPk(req.params.id, {
            include: [{
                model: tbb_carritos,
                as: 'carrito'
            }]
        })
        .then(detalle => {

            if (!detalle) {
                return res.status(404).send({
                    message: 'No encontrado'
                });
            }

            if (
                req.user.rol !== 'admin' &&
                detalle.carrito.id_usuario !== req.user.id
            ) {
                return res.status(403).send({
                    message: 'No autorizado'
                });
            }

            return detalle.update(req.body)
                .then(actualizado => res.status(200).send(actualizado));
        })
        .catch(error => res.status(400).send(error));
    },

    // 🔐 Eliminar detalle
    delete(req, res) {

        return tbc_carrito_detalle.findByPk(req.params.id, {
            include: [{
                model: tbb_carritos,
                as: 'carrito'
            }]
        })
        .then(detalle => {

            if (!detalle) {
                return res.status(404).send({
                    message: 'No encontrado'
                });
            }

            if (
                req.user.rol !== 'admin' &&
                detalle.carrito.id_usuario !== req.user.id
            ) {
                return res.status(403).send({
                    message: 'No autorizado'
                });
            }

            return detalle.destroy()
                .then(() => res.status(204).send());
        })
        .catch(error => res.status(400).send(error));
    }
};