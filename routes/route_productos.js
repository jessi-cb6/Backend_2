const productosController = require('../controllers/controller_productos');
const auth = require('../middlewares/auth');

module.exports = (app) => {

    // 🔓 TODOS pueden ver productos (cliente y admin)
    app.get('/api/productos', auth, productosController.list);
    app.get('/api/producto/:id', auth, productosController.find);

    // 🔐 SOLO ADMIN
    app.post('/api/productos', auth, productosController.create);
    app.put('/api/producto/:id', auth, productosController.update);
    app.delete('/api/producto/:id', auth, productosController.delete);
};