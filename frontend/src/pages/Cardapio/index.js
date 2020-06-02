import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

import Header from "../Header";
import Footer from "../Footer";
import api from "../../services/api";

import "./styles.css";

export default function Cardapio() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("user_id");

  const history = useHistory();

  const [cardapio, setCardapio] = useState([]);
  const [selected, setSelected] = useState("");
  const [response, setResponse] = useState("");
  const [hidden, setHidden] = useState(true);
  const [url, setURL] = useState("");

  const url_atual = `${window.location.protocol}//${window.location.host}`;

  useEffect(() => {
    if (token) {
      localStorage.setItem("login", true);
      getAll();
    } else {
      history.push("/");
    }

    async function getAll() {
      const data = { id };

      await api
        .post("cardapio/allbyproduct", data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setCardapio(response.data.cardapio);
        });
    }
  }, [token, history, id]);

  async function handleSubmit(e) {
    e.preventDefault();

    let domain = url.replace(/\s/g, "");
    domain = domain.toLowerCase();

    const data = { idCardapio: selected, domain };

    await api
      .post("cardapio/generated", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setHidden(false);
        setResponse(response.data);
      });
  }

  return (
    <div>
      <Header />
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <form className="top-cardapio" onSubmit={handleSubmit}>
              <p className="h5 text-center mb-4">
                Escolha o cardápio e LET'S GO
              </p>
              <div className="grey-text">
                <select
                  className="mdb-select md-form"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value="" disabled>
                    Selecione o cardapio...
                  </option>
                  {cardapio.map((cardapio) => (
                    <option key={cardapio.id} value={cardapio.id}>
                      {cardapio.nome}
                    </option>
                  ))}
                </select>
                <MDBInput
                  label="Digite o nome para sua URL"
                  type="text"
                  onChange={(e) => setURL(e.target.value)}
                />
              </div>
              <div className="text-center">
                <MDBBtn color="dark" type="submit">
                  SALVAR
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
          <div hidden={hidden} className="content-sucess">
            <div className="alert-sucesso">
              <FiCheckCircle size={18} />
              <span>Criado com sucesso</span>
            </div>
            <div className="link">
              <label>
                Envie esse link para seus clientes:{" "}
                <Link to={`/loja/${response.domain}`}>
                  {url_atual}/loja/{response.domain}
                </Link>
              </label>
            </div>
          </div>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </div>
  );
}
