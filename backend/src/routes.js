const express = require('express');

// const OngController = require('./controllers/OngController')
// const IncidentController = require('./controllers/IncidentController')
// const ProfiletController = require('./controllers/ProfileController')
// const SessiontController = require('./controllers/SessionController')

const User = require('./controllers/User')

const routes = express.Router();


routes.post('/user/create', User.create);
routes.get('/user/login', User.index);
routes.get('/user/all', User.all);
routes.put('/user/update', User.update);
routes.delete('/user/delete', User.delete);


// routes.delete('/incidents/:id', IncidentController.delete)



module.exports = routes;