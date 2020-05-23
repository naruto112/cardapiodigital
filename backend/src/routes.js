const express = require("express");

const User = require("./controllers/User");
const Cardapio = require("./controllers/Cardapio");
const Produto = require("./controllers/Produto");
const Pedido = require("./controllers/Pedido");

const routes = express.Router();

//ROUTE USUARIO
routes.post("/user/create", User.create);
routes.post("/user/registration", User.RequestRegistration);
routes.post("/user/login", User.authentication);
routes.get("/user/all", User.all);
routes.put("/user/update", User.update);
routes.delete("/user/delete", User.delete);

//ROUTE PEDIDO
routes.post("/pedido", Pedido.ClosedPedido);

//ROUTE CARDAPIO
routes.post("/cardapio/all", Cardapio.all);
routes.post("/cardapio/allbyproduct", Cardapio.allByProduct);
routes.post("/cardapio/create", Cardapio.create);
routes.get("/cardapio", Cardapio.getCardapio);
routes.post("/cardapio/generated", Cardapio.generatedCardapio);
routes.get("/cardapio/loja/:name", Cardapio.menuLoja);

//ROUTE PRODUTO
routes.post("/produto/create", Produto.create);
routes.get("/produto", Produto.allByid);
routes.get("/produto/:id", Produto.produtoByid);
routes.delete("/produto", Produto.delete);
routes.put("/produto", Produto.update);

module.exports = routes;
