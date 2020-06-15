const { Router } = require('express');

const ToDoController = require('./controllers/ToDoController');
const DoneController = require('./controllers/DoneController');

const routes = new Router();

routes.get('/', ToDoController.index);
routes.post('/', ToDoController.store);
routes.put('/', ToDoController.update);

routes.get('/done', DoneController.index);
routes.put('/done', DoneController.update);

module.exports = routes;