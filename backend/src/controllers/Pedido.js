const connection = require("../database/connection");
const dateFormat = require("dateformat");
const authConfig = require("../config/auth");
const jwt = require("jsonwebtoken");
const cryptoRandomString = require("crypto-random-string");
const now = new Date();

module.exports = {
  async allPedido(request, response) {
    const { id } = request.params;

    const resp = await connection("pedido")
      .where("menu.usuario_id", id)
      .select("pedido_cupom")
      .join("generated_cardapio", {
        "pedido.nomeloja": "generated_cardapio.domain",
      })
      .join("menu", { "generated_cardapio.menu_id": "menu.id" });

    return response.status(200).json({ resp });
  },
  async PedidobyID(request, response) {},
  async ClosedPedido(request, response) {
    const token = request.headers.authorization;
    jwt.verify(token, authConfig.secret, function (err, decoded) {
      if (err) {
        const { message } = err;
        return response.status(200).json({ message });
      }
      certisign = decoded;
    });

    if (certisign) {
      const { nomeloja, pedido_cupom, phonecliente } = request.body;
      const created_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");
      const update_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");

      await connection("pedido").insert({
        nomeloja,
        pedido_cupom,
        phonecliente,
        created_datetime,
        update_datetime,
      });

      return response.status(200).json({ status: true });
    }
  },
};
