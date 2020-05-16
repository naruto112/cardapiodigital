import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthConfig from "../../../config/auth.json";
import jwt from "jsonwebtoken";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

import api from "../../../services/api";

import "./styles.css";
import cardapioImg from "../../../assets/logo_menu.png";

export default function Cadastro(props) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [second_name, setSecond_name] = useState("");
  const [passwd, setPasswd] = useState("");
  const [confirmpasswd, setConfirmPasswd] = useState("");
  const [mail, setMail] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [phone, setPhone] = useState("");

  const [token, setToken] = useState("");

  const { id } = props.match.params;

  useEffect(() => {
    try {
      jwt.verify(id, AuthConfig.secret);
      setToken(id);
    } catch (err) {
      alert("Essa URL já se expirou");
      history.push("/");
    }
  }, [history]);

  async function handleCadasrtro(e) {
    e.preventDefault();

    const data = {
      name,
      second_name,
      user: mail,
      passwd,
      mail,
      city,
      uf,
      cep,
      address,
      number,
      phone,
    };

    await api
      .post("user/create", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const { status } = response.data;
        if (status) {
          alert(
            "Cadastro concluído, entre com seu email para se logar no sistema"
          );
          history.push("/");
        }
      });
  }

  return (
    <div className="container-cadastro">
      <div className="container-form">
        <h1>.Cardápio Digital</h1>
        <form
          className="needs-validation"
          onSubmit={handleCadasrtro}
          noValidate
        >
          <MDBRow>
            <MDBCol md="4">
              <MDBInput
                value={name}
                name="fname"
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="materialFormRegisterNameEx"
                label="Digite seu primeiro nome"
                required
              ></MDBInput>
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                value={second_name}
                name="lname"
                onChange={(e) => setSecond_name(e.target.value)}
                type="text"
                id="materialFormRegisterEmailEx2"
                label="Segundo nome"
                required
              ></MDBInput>
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                type="email"
                id="materialFormRegisterConfirmEx3"
                name="email"
                label="Digite seu e-mail"
              ></MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="4">
              <MDBInput
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="city"
                label="Sua cidade"
                required
              ></MDBInput>
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="state"
                label="UF"
                required
              ></MDBInput>
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="zip"
                label="CEP"
                required
              ></MDBInput>
            </MDBCol>
            <MDBCol md="8">
              <MDBInput
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="address"
                label="Endereço"
                required
              ></MDBInput>
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="number"
                label="Nº"
                required
              ></MDBInput>
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="number"
                label="Telefone de Contato*"
                required
              ></MDBInput>
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                value={passwd}
                onChange={(e) => setPasswd(e.target.value)}
                type="password"
                id="passwd"
                name="passwd"
                label="Digite uma senha*"
                required
              ></MDBInput>
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                value={confirmpasswd}
                onChange={(e) => setConfirmPasswd(e.target.value)}
                type="password"
                id="confirmpasswd"
                name="confirmpasswd"
                label="Digite novamente a senha*"
                required
              ></MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBRow></MDBRow>
          <div>
            <MDBBtn color="dark" type="submit">
              CONCLUIR CADASTRO
            </MDBBtn>
          </div>
        </form>
      </div>
      <div className="logo-container">
        <img src={cardapioImg} alt="Logo do Pós Cadastro" />
      </div>
    </div>
  );
}
