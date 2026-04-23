const usuariosController = require('../controllers/controller_usuarios');
const auth = require('../middlewares/auth');

module.exports = (app) => {

    // 🔓 LOGIN (libre)
    app.post('/api/login', usuariosController.login);

    // 🔐 SOLO ADMIN (crear usuario)
    app.post('/api/usuarios', usuariosController.create);

    // 🔐 SOLO ADMIN (ver todos)
    app.get('/api/usuarios', auth, usuariosController.list);

    // 🔐 SOLO LOGUEADO (ver uno)
    app.get('/api/usuario/:id', auth, usuariosController.find);

    // 🔐 SOLO ADMIN (editar)
    app.put('/api/usuario/:id', auth, usuariosController.update);

    // 🔐 SOLO ADMIN (eliminar)
    app.delete('/api/usuario/:id', auth, usuariosController.delete);
};