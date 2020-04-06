import React, { useEffect, useState } from 'react'

import './styles.css';

import Header from '../Header'
import Footer from '../Footer'

import api from '../../services/api'
import imgLanche from '../../assets/lanche.png'

export default function Produto(props) {

    const id = props.match.params.id
    const token = localStorage.getItem('token');

    const [nomeCardapio, setNomeCardapio] = useState('');
    const [descricao, setDescricao] = useState('');
    const [produtos, setProdutos] = useState([]);
    

    useEffect(() => {
        
        api.get(`cardapio`, {
            headers: {
                Authorization: token,
            },
            params: {
                id
            }
        }).then(response =>{
            setNomeCardapio(response.data.cardapio[0].nome)
            setDescricao(response.data.cardapio[0].descricao)
        })
        

        api.get('produto', {
            headers: {
                Authorization: token,
            },
            params: {
                id
            }
        }).then(response => {
            setProdutos(response.data.produto);
        })

    }, [id, token, produtos]);

    return(
        <div className="new-produto-container">
            <Header/>
                <div className="content">
                    <form onSubmit={() => {}}> 
                        <div className="menu">
                            <span className="name-menu">
                                <p>Nome Cardápio</p>
                                <strong>{nomeCardapio}</strong>
                            </span>
                            <br/>
                            <span className="desc-menu">  
                                <p>Descrição</p>
                                <strong>{descricao}</strong>
                            </span>
                        </div>             
                    </form>
                </div>
                {produtos.map(produtos => (
                    <ul key={produtos.id} className="produto-ul">
                        <li className="grid">
                            <img src={imgLanche} alt="Burger" className="img-produto" />
                            <span className="name-produto">{produtos.nome}</span>
                            <span className="description-produto">{produtos.descricao}</span>
                            <span className="price-produto">{produtos.valor}</span>
                        </li>
                    </ul>
                ))}
            <Footer/>
        </div>
    );
}