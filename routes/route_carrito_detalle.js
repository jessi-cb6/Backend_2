const detalleController = require('../controllers/controller_carrito_detalle');
const auth = require('../middlewares/auth');

module.exports = (app) => {

    // 🔐 TODOS deben estar logueados
    app.get('/api/detalles', auth, detalleController.list);
    app.get('/api/detalle/:id', auth, detalleController.find);
    app.post('/api/detalles', auth, detalleController.create);
    app.put('/api/detalle/:id', auth, detalleController.update);
    app.delete('/api/detalle/:id', auth, detalleController.delete);
};