const connection = require("../database/connection");
const dateFormat = require("dateformat");
const authConfig = require("../config/auth");
const jwt = require("jsonwebtoken");
const cryptoRandomString = require("crypto-random-string");
const now = new Date();

module.exports = {
  async allPedido(request, response) {},
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
      const { name, cupomFiscal, phone } = request.body;
      return response.status(200).json({ cupomFiscal });
    }
  },
};
