import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import Footer from "../Footer";

import "./styles.css";
import Loader from "react-loader-spinner";
import ImageSacola from "../../assets/sacola_vazia.png";

import api from "../../services/api";

export default function Loja(props) {
  const { name } = props.match.params;
  const token = localStorage.getItem("token");
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState([]);
  const [count, setCount] = useState(1);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [detail, setDetail] = useState("");
  let [idPedido, setIdPedido] = useState(10);
  let [valor, setValor] = useState();
  let [totalValor, setTotalvalor] = useState(0);
  let [totalPedido, setTotalPedido] = useState(0.0);

  useEffect(() => {
    handleMenuProduto(name);
    setLoader(true);

    async function handleMenuProduto(name) {
      await api
        .get(`cardapio/loja/${name}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((resp) => {
          setProdutos(resp.data.loja);
          setLoader(false);
        });
    }
  }, [name, token]);

  async function handleClick(key) {
    await api.get(`produto/${key}`, {}).then((resp) => {
      setProduto(resp.data.produto[0]);
      let x = resp.data.produto[0].valor;
      setValor(x.replace("R$", ""));
    });

    setModal(true);
  }

  function handlePedido(name, count, detail, value) {
    let t =
      parseFloat(totalPedido.toString().replace(",", ".")) +
      parseFloat(value.replace(",", "."));
    setTotalPedido(t.toFixed(2).toString().replace(".", ","));

    setIdPedido(idPedido + 1);
    pedido.push({ produto: { idPedido, name, count, detail, value } });
    console.log(pedido);
    setCount(1);
    setTotalvalor(0);
    setModal(false);
  }

  function handleClosedPedido(e) {
    e.preventDefault();

    // const phone = 5511987474136;

    // let cupomFiscal =
    //   "*CardapioDigital - Novo pedido*\n ----------------------\n *1x Burger Angus* R$ 16,20";

    // window.encodeURIComponent(cupomFiscal);

    // window.open(
    //   "https://web.whatsapp.com/send?phone=" + phone + "&text=" + cupomFiscal,
    //   "_blank"
    // );
  }

  function handleMorePrice() {
    if (totalValor === 0) totalValor = valor;

    let a =
      parseFloat(valor.replace(",", ".")) +
      parseFloat(totalValor.replace(",", "."));

    setTotalvalor(a.toFixed(2).toString().replace(".", ","));

    setCount(count + 1);
  }

  function handleRemove(index) {
    setPedido(pedido.filter((value) => value !== pedido[index]));
  }

  function handleLessPrice(value) {
    const v =
      parseFloat(value.replace(",", ".")) - parseFloat(valor.replace(",", "."));
    setTotalvalor(v.toFixed(2).toString().replace(".", ","));
    setCount(count - 1);
  }

  function handleCloseUp() {
    setModal(false);
    setCount(1);
    setTotalvalor(0);
  }

  return (
    <div>
      <div className="titulo-cardapio">.Cardapio Digital 🍔</div>
      {pedido.length === 0 ? (
        <img src={ImageSacola} alt="Sacola Vazia" className="sacola" />
      ) : (
        <div className="notation">
          <form className="form-pedido" onSubmit={handleClosedPedido}>
            <div style={{ color: "#8e8e8e", marginBottom: 10 }}>
              Seu pedido em
            </div>
            <span>{name}</span>

            {pedido.map((pedido, index) => (
              <div key={pedido.produto.idPedido} className="restaurant-line">
                <div className="pedido-note">
                  <div>
                    {pedido.produto.count}x {pedido.produto.name}
                  </div>
                  <label>R$ {pedido.produto.value}</label>
                </div>
                {pedido.produto.detail === "" ? (
                  ""
                ) : (
                  <div className="restaurant-cart-item__obs">
                    Obs.: {pedido.produto.detail}
                  </div>
                )}

                <span
                  onClick={() => handleRemove(index)}
                  className="pedido-remove"
                >
                  Remover
                </span>
              </div>
            ))}
            <div className="restaurant-line"></div>
            <div className="sub-total">
              <div>Subtotal</div>
              <label>R$ {totalPedido}</label>
            </div>
            <div className="taxa-entrega">
              <div>Taxa de entrega</div>
              <label>Grátis</label>
            </div>
            <div className="total">
              <div>Total</div>
              <label>R$ {totalPedido}</label>
            </div>
            <div className="restaurant-line"></div>
            <MDBBtn color="dark" type="submit" className="btn-pedido">
              Fechar pedido
            </MDBBtn>
          </form>
        </div>
      )}

      <Loader
        type="ThreeDots"
        color="#555555"
        height={100}
        width={100}
        className="loading"
        visible={loader}
      />
      <div className="logo">
        {produtos.map((produto) => (
          <div key={produto.id} onClick={(e) => handleClick(produto.id)}>
            <img src={produto.base64} alt="Burger" className="produto-image" />
            <span>
              <label style={{ fontWeight: "bold", cursor: "pointer" }}>
                {produto.nome}
              </label>
              <label
                style={{ color: "#8e8e8e", width: 180, cursor: "pointer" }}
              >
                {produto.descricao}
              </label>
              <label className="logo price">{produto.valor}</label>
            </span>
          </div>
        ))}
      </div>
      <MDBContainer className="top">
        <MDBModal isOpen={modal} toggle={handleCloseUp}>
          <MDBModalHeader toggle={handleCloseUp}></MDBModalHeader>
          <MDBModalBody>
            <img
              alt="Teste"
              src={produto.base64}
              className="dish-content__img marmita-image-expandable__image"
            />
            <div className="title-product">
              <span>{produto.nome}</span>
              <label>{produto.descricao}</label>
              <div>{produto.valor}</div>
            </div>
            <div className="dish-observation-form__header">
              <label className="dish-observation-form__label">
                Algum comentário?
              </label>
              <span className="dish-observation-form__counter">0 / 140</span>
            </div>
            <textarea
              maxLength="140"
              className="dish-observation-form__textarea"
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Ex: tirar a cebola, maionese à parte etc."
            ></textarea>
          </MDBModalBody>
          <MDBModalFooter>
            <div className="dish-action__counter">
              <button
                onClick={() => handleLessPrice(totalValor)}
                disabled={count === 1 ? true : false}
              >
                -
              </button>
              {count}
              <button onClick={handleMorePrice}>+</button>
            </div>
            <MDBBtn
              color="dark"
              onClick={() =>
                handlePedido(
                  produto.nome,
                  count,
                  detail,
                  totalValor === 0 ? valor : totalValor
                )
              }
              className="dish-action__add-button"
            >
              <span>Adicionar</span>
              <span>R$ {totalValor === 0 ? valor : totalValor}</span>
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
      <Footer />
    </div>
  );
}
