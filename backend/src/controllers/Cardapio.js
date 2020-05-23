const connection = require("../database/connection");
const dateFormat = require("dateformat");
const authConfig = require("../config/auth");
const jwt = require("jsonwebtoken");
const cryptoRandomString = require("crypto-random-string");
const now = new Date();

module.exports = {
  // EXIBE TODOS OS CARDAPIOS REFERENTE A PESSOA
  async all(request, response) {
    const token = request.headers.authorization;
    let certisign = "";

    jwt.verify(token, authConfig.secret, function (err, decoded) {
      if (err) {
        const { message } = err;
        return response.status(200).json({ message });
      }

      certisign = decoded;
    });

    if (certisign) {
      const { id } = request.body;

      const cardapio = await connection("menu")
        .groupBy("menu.id")
        .where("usuario_id", id)
        .leftJoin("produto", { "menu.id": "produto.menu_id" })
        .select(
          "menu.id",
          "menu.nome",
          "menu.descricao",
          "menu.usuario_id",
          "produto.nome as Produto"
        );

      return response.status(200).json({ cardapio });
    }
  },

  async allByProduct(request, response) {
    const token = request.headers.authorization;
    let certisign = "";

    jwt.verify(token, authConfig.secret, function (err, decoded) {
      if (err) {
        const { message } = err;
        return response.status(200).json({ message });
      }

      certisign = decoded;
    });

    if (certisign) {
      const { id } = request.body;

      const cardapio = await connection("menu")
        .groupBy("menu.id")
        .where("usuario_id", id)
        .innerJoin("produto", { "menu.id": "produto.menu_id" })
        .select(
          "menu.id",
          "menu.nome",
          "menu.descricao",
          "menu.usuario_id",
          "produto.nome as Produto"
        );

      return response.status(200).json({ cardapio });
    }
  },

  // EXIBE O CARDAPIO PELO ID

  async getCardapio(request, response) {
    const token = request.headers.authorization;
    const valid = jwt.verify(token, authConfig.secret);

    if (valid.id) {
      const { id } = request.body;

      const user = await connection("usuario").where("id", id).select("*");

      if (user[0]) {
        const { id } = request.query;

        const cardapio = await connection("menu").where("id", id).select("*");

        return response.status(200).json({ cardapio });
      } else {
        return response.status(200).json({ status: false });
      }
    }
  },

  // CRIA UM CARDAPIO
  async create(request, response) {
    const { nome, descricao, id } = request.body;
    const token = request.headers.authorization;
    const created_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");
    const update_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");

    jwt.verify(token, authConfig.secret, function (err, decoded) {
      if (err) {
        const { message } = err;
        return response.status(200).json({ message });
      }

      certisign = decoded;
    });

    if (certisign) {
      await connection("menu").insert({
        nome,
        descricao,
        created_datetime,
        update_datetime,
        usuario_id: id,
      });

      const crypto = cryptoRandomString({ length: 10 });

      return response.status(200).json({ nome, descricao, id: crypto });
    } else {
      return response.status(200).json({ status: "notfound token" });
    }
  },

  async generatedCardapio(request, response) {
    const { idCardapio, domain } = request.body;
    const created_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");
    const update_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");
    const token = request.headers.authorization;

    const valid = jwt.verify(token, authConfig.secret);

    if (valid) {
      await connection("generated_cardapio").insert({
        domain,
        menu_id: idCardapio,
        created_datetime,
        update_datetime,
      });

      return response.status(200).json({ idCardapio, domain });
    } else {
      return response.status(200).json({ status: "Token Invalid" });
    }
  },

  async menuLoja(request, response) {
    const { name } = request.params;
    const token = request.headers.authorization;

    const valid = jwt.verify(token, authConfig.secret);

    if (valid) {
      const loja = await connection("generated_cardapio")
        .where("domain", name)
        .join("menu", { "generated_cardapio.menu_id": "menu.id" })
        .join("produto", { "menu.id": "produto.menu_id" })
        .join("usuario", { "menu.usuario_id": "usuario.id" })
        .select(
          "produto.id",
          "produto.nome",
          "produto.descricao",
          "produto.valor",
          "produto.base64",
          "produto.menu_id",
          { cardapio_id: "generated_cardapio.id" },
          "usuario.phone"
        );

      return response.status(200).json({ loja });
    } else {
      return response.status(200).json({ status: "Token Invalid" });
    }
  },
};
