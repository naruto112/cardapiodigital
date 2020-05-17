import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import {
  MDBBtn,
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
} from "mdbreact";
import Footer from "../Footer";

import "./styles.css";
import Loader from "react-loader-spinner";
import ImageSacola from "../../assets/sacola_vazia.png";
import { maskCpf } from "../../config/mask";
import api from "../../services/api";

export default function Loja(props) {
  const { name } = props.match.params;
  const token = localStorage.getItem("token");
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState([]);
  const [count, setCount] = useState(1);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [cpfMask, setCpfMask] = useState("");
  const [nomeCliente, setCliente] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedTroco, setSelectedTroco] = useState("");
  const [delivery, setDelivery] = useState("");
  const [troco, setTroco] = useState(true);
  const [valorTroco, setValorTroco] = useState("");
  const [modalpedido, setModalPedido] = useState(false);
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
    setCount(1);
    setTotalvalor(0);
    setModal(false);
    setDetail("");
  }

  function handleClosedPedido(e) {
    e.preventDefault();
    setModalPedido(true);
  }

  function handlePedidoSend() {
    const data = [];

    const dNow = new Date();
    const localdate =
      dNow.getDate() +
      "/" +
      (dNow.getMonth() + 1) +
      "/" +
      dNow.getFullYear() +
      " " +
      dNow.getHours() +
      ":" +
      dNow.getMinutes();

    data.push(pedido);
    data.push({ total: totalPedido });
    if (!cpfMask) {
      alert("Coloque o CPF");
      return false;
    }
    data.push({ cpf: cpfMask });

    if (!selected) {
      alert("Escolha a Forma de Pagamento");
      return false;
    }
    if (selected === "Dinheiro") {
      data.push({ formPgto: selected });
      data.push({ troco: selectedTroco });
    } else {
      data.push({ formPgto: selected });
    }

    console.log(data[0]);

    //Telefone do whatsapp do restaurante
    const phone = 5511987474136;


    let cupomFiscal = "";
    cupomFiscal += `*CardapioDigital - Novo pedido* %0A`;
    cupomFiscal += `----------------------------------------------- %0A`;
    data[0].map((note) => {
      cupomFiscal += `*${note.produto.count}x ${note.produto.name}* R$ ${note.produto.value} %0A`;
      cupomFiscal += `- Obs: ${
        note.produto.detail === "" ? "nenhuma" : note.produto.detail
      } %0A`;
      cupomFiscal += `%0A`;
    });
    cupomFiscal += `*Total: R$ ${data[1].total}* %0A`;
    cupomFiscal += `----------------------------------------------- %0A`;
    cupomFiscal += `*Entrega ou Retirada?* %0A`;
    cupomFiscal += `${delivery} %0A`;
    cupomFiscal += `*Como você vai pagar?* %0A`;
    cupomFiscal += `${data[3].formPgto} %0A`;
    if (selectedTroco) {
      cupomFiscal += `*Troco para quanto?* %0A`;
      cupomFiscal += `R$ ${valorTroco} %0A`;
    }
    cupomFiscal += `*Nome* %0A`;
    cupomFiscal += `${nomeCliente} %0A`;
    cupomFiscal += `*CPF* %0A`;
    cupomFiscal += `${data[2].cpf} %0A`;
    cupomFiscal += `_Pedido recebido pelo Cardápio Digital às ${localdate}_ %0A`;

    window.encodeURIComponent(cupomFiscal);
    window.open(
      "https://web.whatsapp.com/send?phone=" + phone + "&text=" + cupomFiscal,
      "_blank"
    );
  }

  function EventListener(e) {
    if (e.target.value === "Dinheiro") {
      setTroco(false);
      setSelected(e.target.value);
    } else {
      setTroco(true);
      setSelected(e.target.value);
      setSelectedTroco("");
    }
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
      {/* Modal para Encerrar o Pedido*/}

      <MDBContainer>
        <MDBModal isOpen={modalpedido} toggle={() => setModalPedido(false)}>
          <MDBModalHeader toggle={() => setModalPedido(false)}>
            Confirma Pedido?
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput
              label="Digite seu Nome *"
              onChange={(e) => setCliente(e.target.value)}
              icon=""
              value={nomeCliente}
              group
              type="text"
              error="wrong"
              success="right"
            />
            <MDBInput
              label="Digite seu CPF *"
              onChange={(e) => setCpfMask(e.target.value)}
              icon=""
              value={maskCpf(cpfMask)}
              group
              type="text"
              error="wrong"
              success="right"
            />
            <select
              className="browser-default custom-select"
              value={selected}
              onChange={(e) =>
                e.target.value === "Dinheiro"
                  ? EventListener(e)
                  : EventListener(e)
              }
              style={{ marginBottom: 15 }}
            >
              <option value="" disabled>
                Forma de Pagamento...
              </option>
              <option value="Débito">Cartão de Débito</option>
              <option value="Crédito">Cartão de Crédito</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
            <select
              hidden={troco}
              className="browser-default custom-select"
              value={selectedTroco}
              onChange={(e) => setSelectedTroco(e.target.value)}
            >
              <option value="" disabled>
                Troco?
              </option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
            {selectedTroco === "Sim" ? (
              <MDBInput
                label="Quanto de Troco?"
                onChange={(e) => setValorTroco(e.target.value)}
                icon=""
                value={valorTroco}
                group
                type="text"
                error="wrong"
                success="right"
              />
            ) : (
              ""
            )}
            <select
              className="browser-default custom-select"
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
            >
              <option value="" disabled>
                Entrega ou Retirada?
              </option>
              <option value="Reirada">Retirada</option>
              <option value="Entrega">Entrega</option>
            </select>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="sucess"
              className="conclude"
              onClick={handlePedidoSend}
            >
              <FiCheckCircle size={18} />
              <div>Confirmar</div>
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>

      {/* Modal Adicionar Produto*/}
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
