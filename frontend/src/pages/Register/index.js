import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import cardapioImg from "../../assets/logo_menu.png";

import "./styles.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      phone,
    };

    try {
      const response = await api.post("user/registration", data);
      alert(
        `Aguarde, em alguns instantes receberá o e-mail para continuar o cadastro`
      );
      history.push("/");
    } catch (err) {
      alert(`Erro no cadastro, tente novamente`);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={cardapioImg} alt="Be The Hero" width={250} />
          <h1>Acesso ao Sistema</h1>
          <p>
            Faça seu pré-cadastro, e aguarde um e-mail para confirmar um novo
            cadastro.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o Login
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Telefone de Contato"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="button" type="submit">
            Solicitar
          </button>
        </form>
      </div>
    </div>
  );
}
