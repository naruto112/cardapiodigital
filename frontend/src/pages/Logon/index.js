import React, { useState, useEffect } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";

import cardapioImg from "../../assets/logo_menu.png";

export default function Logon() {
  const [user, setUser] = useState("");
  const [passwd, setPasswd] = useState("");
  const [verifyuser, setVerifyuser] = useState(true);
  const [verifypass, setVerifypass] = useState(true);

  const token = localStorage.getItem("token");

  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push("/painel");
    }
  }, [token, history]);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("user/login", {
        user,
        passwd,
      });

      const { error } = response.data;

      if (error) {
        setVerifypass(false);
        return false;
      }

      const { res, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("name", res[0].name);
      localStorage.setItem("user_id", res[0].id);

      history.push("/painel");
    } catch (err) {
      localStorage.clear();
      setVerifyuser(false);
    }
  }

  return (
    <div>
      <div className="alert alert-danger" role="alert" hidden={verifyuser}>
        E-mail usado para login está incorreto
      </div>
      <div className="alert alert-danger" role="alert" hidden={verifypass}>
        Senha incorreta
      </div>
      <div className="logon-container">
        <section className="form">
          <h1>.Cardápio Digital</h1>
          <form onSubmit={handleLogin}>
            <h2>Faça seu Logon</h2>
            <input
              placeholder="Seu e-mail"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Digite sua senha"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
            />
            <button className="button" type="submit">
              Entrar
            </button>
            <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#545152" />
              Solicite um cadastro
            </Link>
          </form>
        </section>
        <img src={cardapioImg} alt="CardDigital" />
      </div>
    </div>
  );
}
