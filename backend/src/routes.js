const express = require('express');

const User = require('./controllers/User');
const Cardapio = require('./controllers/Cardapio');
const Produto = require('./controllers/Produto');

const routes = express.Router();


//ROUTE USUARIO
routes.post('/user/create', User.create);
routes.post('/user/login', User.index);
routes.get('/user/all', User.all);
routes.put('/user/update', User.update);
routes.delete('/user/delete', User.delete);


//ROUTE CARDAPIO
routes.get('/cardapio/all', Cardapio.all)
routes.post('/cardapio/create', Cardapio.create);
routes.get('/cardapio', Cardapio.getCardapio);


//ROUTE PRODUTO
routes.post('/produto/create', Produto.create);
routes.get('/produto', Produto.allByid);
routes.delete('/produto', Produto.delete);
routes.put('/produto', Produto.update);


module.exports = routes;