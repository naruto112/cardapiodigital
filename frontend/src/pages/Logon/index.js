import React, { useState, useEffect } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdbreact";

import api from "../../services/api";

import "./styles.css";

import cardapioImg from "../../assets/cardapio_digital.png";

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
        <MDBContainer>
          <form onSubmit={handleLogin}>
            <MDBRow>
              <MDBCol md="6">
                <MDBCard>
                  <div className="header pt-3 grey lighten-2">
                    <MDBRow className="d-flex justify-content-start">
                      <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                        <div className="title-login">
                          <div>.Cardapio Digital</div>
                          <img
                            src={cardapioImg}
                            alt="Cardapio Digigital"
                            width={50}
                          />
                        </div>
                      </h3>
                    </MDBRow>
                  </div>
                  <MDBCardBody className="mx-4 mt-4">
                    <MDBInput
                      label="E-mail"
                      group
                      type="text"
                      validate
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                    />
                    <MDBInput
                      label="Senha"
                      group
                      type="password"
                      validate
                      containerClass="mb-0"
                      value={passwd}
                      onChange={(e) => setPasswd(e.target.value)}
                    />
                    <p className="font-small grey-text d-flex justify-content-end">
                      Esqueceu a
                      <a
                        href="#!"
                        className="dark-grey-text font-weight-bold ml-1"
                      >
                        Senha?
                      </a>
                    </p>
                    <div className="text-center mb-4 mt-5">
                      <MDBBtn
                        color="dark"
                        type="submit"
                        className="btn-block z-depth-2"
                      >
                        Entrar
                      </MDBBtn>
                    </div>
                    <p className="font-small grey-text d-flex justify-content-center">
                      Você ainda não tem conta?
                      <Link
                        to="/register"
                        className="dark-grey-text font-weight-bold ml-1"
                      >
                        Solicite aqui
                      </Link>
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBContainer>
      </div>
    </div>
  );
}
