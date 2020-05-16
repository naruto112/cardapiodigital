import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FiTrash2, FiPlus, FiAlertTriangle, FiEye } from "react-icons/fi";
import Loader from "react-loader-spinner";
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Header from "../Header";
import Footer from "../Footer";
import Produto from "../Produto";

import api from "../../services/api";

import "./styles.css";

export default function Painel() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("user_id");

  const [loader, setLoader] = useState(false);

  const [cardapio, setCardapio] = useState([]);
  const [modalCard, setModalCard] = useState(false);
  const [modal, setModal] = useState(false);
  const [nomeCardapio, setNomeCardapio] = useState("");
  const [descricaoCardapio, setDescricaoCardapio] = useState("");

  const [idCardapio, setIdCardapio] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [descProduto, setDescProduto] = useState("");
  const [valorProduto, setValorProduto] = useState("");
  const [imgProduto, setImgProduto] = useState("");
  const [dataProduto, setDataProduto] = useState([]);

  const history = useHistory();

  useEffect(() => {
    //VERIFICA SE O MESMO ESTA LOGADO PARA VALIDAR A PAGINA
    if (token) {
      localStorage.setItem("login", true);
      getAll();
    } else {
      history.push("/");
    }

    async function getAll() {
      const data = { id };

      await api
        .post("cardapio/all", data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.data.message === "jwt expired") {
            localStorage.clear();
            history.push("/");
          }
          setCardapio(response.data.cardapio);
        });
    }
  }, [token, history, id]);

  async function CadastrarCardapio(e) {
    const token = localStorage.getItem("token");
    e.preventDefault();

    const data = {
      id,
      nome: nomeCardapio,
      descricao: descricaoCardapio,
    };

    await api
      .post("cardapio/create", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setModalCard(false);
        cardapio.push(response.data);
        history.push("/painel");
      });
  }

  async function CadastrarProduto(e) {
    e.preventDefault();

    const data = {
      nome: nomeProduto,
      descricao: descProduto,
      valor: valorProduto,
      id: idCardapio,
      base64: imgProduto,
    };

    await api
      .post("produto/create", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response) setModal(false);
      });
  }

  async function onChange(e) {
    const file = e.target.files[0];
    // console.log(await toBase64(file));
    setImgProduto(await toBase64(file));
  }

  async function getProduto(id) {
    setLoader(true);

    await api
      .get("produto", {
        headers: {
          Authorization: token,
        },
        params: {
          id,
        },
      })
      .then((response) => {
        setLoader(false);
        setDataProduto(response.data.produto);
      });
  }

  async function OpenHandlerProduto(id) {
    setIdCardapio(id);
    setModal(true);
  }

  //CONVERTE IMAGEM PARA BASE64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="painel-container">
      <Header />
      <div className="painel-container-add">
        <Loader
          type="ThreeDots"
          color="#555555"
          height={100}
          width={100}
          className="loader"
          visible={loader}
        />
      </div>
      <button
        onClick={() => setModalCard(true)}
        className="painel-container-button"
      >
        <FiPlus size={15} />
      </button>
      <div className="scroll-cardapio">
        <ul>
          {cardapio.map((cardapio) => (
            <li key={cardapio.id}>
              <strong>NOME:</strong>
              <p>{cardapio.nome}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{cardapio.descricao}</p>

              <button
                className="btn-produto"
                onClick={() => OpenHandlerProduto(cardapio.id)}
                type="button"
              >
                <FiPlus size={15} color="#a8a8b3" />
              </button>
              <button className="btn-trash" onClick={() => {}} type="button">
                <FiTrash2 size={15} color="#a8a8b3" />
              </button>
              <button
                className="btn-edit"
                onClick={() => getProduto(cardapio.id)}
                type="button"
              >
                {cardapio.Produto === null ? (
                  ""
                ) : (
                  <FiEye size={15} color="#a8a8b3" />
                )}
              </button>
              {cardapio.Produto === null ? (
                <span className="alert-danger">
                  <FiAlertTriangle style={{ marginRight: 10 }} />
                  N/Produto
                </span>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      </div>
      {/*---------------------------------------------------- MODAL ----------------------------------------------------------------------------------*/}
      <MDBModal
        isOpen={modalCard}
        toggle={() => setModalCard(false)}
        className="top"
      >
        <MDBModalHeader toggle={() => setModalCard(false)}>
          Adicionar Cardápio
        </MDBModalHeader>
        <MDBModalBody>
          <form onSubmit={CadastrarCardapio}>
            <div className="grey-text">
              <MDBInput
                label="Nome do cardápio"
                group
                type="text"
                onChange={(e) => setNomeCardapio(e.target.value)}
              />
              <MDBInput
                label="Descrição do Cardápio"
                group
                type="text"
                onChange={(e) => setDescricaoCardapio(e.target.value)}
              />
            </div>
            <MDBModalFooter className="bar-footer">
              <MDBBtn color="dark" type="submit">
                Incluir
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalBody>
      </MDBModal>
      {/*---------------------------------------------------------------------------------------------------------------------------------------*/}
      <MDBModal isOpen={modal} toggle={() => setModal(false)} className="top">
        <MDBModalHeader toggle={() => setModal(false)}>
          Adicionar Produto
        </MDBModalHeader>
        <MDBModalBody>
          <form onSubmit={CadastrarProduto}>
            <div className="grey-text">
              <MDBInput
                label="Nome do Produto"
                group
                type="text"
                onChange={(e) => setNomeProduto(e.target.value)}
              />
              <MDBInput
                label="Descrição do Produto"
                group
                type="text"
                onChange={(e) => setDescProduto(e.target.value)}
              />
              <MDBInput
                label="R$ 0,00"
                group
                type="text"
                onChange={(e) => setValorProduto(e.target.value)}
              />
              <MDBInput group type="file" onChange={onChange} />
            </div>
            <MDBModalFooter className="bar-footer">
              <MDBBtn color="dark" type="submit">
                Incluir
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalBody>
      </MDBModal>
      <Produto params={dataProduto} />
      <Footer />
    </div>
  );
}
