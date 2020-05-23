const Mail = require("../lib/Mail");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = {
  key: "RegistrationMail",
  async handle({ data }) {
    const { user } = data;
    const id = Math.random();

    //Gera o jsonwebtoken para enviar a continuação do cadastro com tempo de expiração
    const hash = jwt.sign({ id: id }, authConfig.secret, {
      expiresIn: 1200,
    });

    await Mail.sendMail({
      from: "Cardápio Digital <renatorock3@hotmail.com.br>",
      to: `${user.name} <${user.email}>`,
      subject: "Cadastro Cardápio Digital",
      html: `<p>Olá, ${user.name}.</p>
                   <p>Para continuar o cadastro você deve entrar no <a href="http://localhost/cadastro/${hash}">link</a>`,
    });
  },
};
