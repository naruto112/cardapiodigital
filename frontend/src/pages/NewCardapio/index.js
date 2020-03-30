import React, { useState, useEffect, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { 
    FiUser, 
    FiArrowLeft, 
    FiPlusCircle,
    FiSave,
    FiX
} from 'react-icons/fi';


import api from '../../services/api'
import imgLanche from '../../assets/lanche.png'

import './styles.css';


export default function NewCardapio() {

    const name = localStorage.getItem('name')
    const [hide, sethide] = useState(true);

    function ExibeProduto() {
        sethide(false);
    }

    function FixClose() {
        sethide(true);
    }

    const escFunction = useCallback((event) => {
        if(event.keyCode === 27) {
            sethide(true);
        }
      }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
    
        return () => {
          document.removeEventListener("keydown", escFunction, false);
        };
    }, []);
        
    return(
        <div className="new-cardapio-container">
            <div className="header">
                <h1>.Cardápio Digital</h1> 
                <span> <FiUser size={18} color="#FFF" />Usuário(a), {name}</span>
            </div>
            <div className="content">
                <form onSubmit={() =>{}}> 
                    <input 
                    placeholder="Nome do cardápio" 
                    value=""
                    onChange={() => {}}
                    />
                    <span className="produto">
                        PRODUTOS
                        <Link to="#" className="plus" onClick={ExibeProduto}>
                            <FiPlusCircle size={20} color="#403d3e" />
                        </Link>
                    </span>
                   <ul className="produto-ul">
                       <li className="grid">
                          <img src={imgLanche} alt="Burger" className="img-produto" />
                          <span className="name-produto">Burger Rodeios 3.0</span>
                          <span className="description-produto">Burger Angus 180g, Queijo Prato, Peperoni, Cream Cheese e Molho Barbecue</span>
                          <span className="price-produto">R$ 27,00</span>
                       </li>
                   </ul>
                   <div className="form-produto" hidden={hide}>
                    <Link to="#" className="fix-close" onClick={FixClose}>
                        <FiX size={20} color="#272727"/>
                    </Link>
                    <input 
                        placeholder="Nome do Produto" 
                        value=""
                        onChange={() => {}}
                        />
                        <textarea 
                        placeholder="Descrição do Produto" 
                        value=""
                        onChange={() => {}}
                        />
                        <input 
                        placeholder="R$ 0,00" 
                        value=""
                        onChange={() => {}}
                        />
                        <Link to="#" className="button" type="submit">Incluir</Link>
                   </div>
                    <button className="button" type="submit"><FiSave size={18} color="#FFF"/> Gravar</button>
                </form>
            </div>
            <Link className="back-link-card" to="/painel">
                <FiArrowLeft size={16} color="#545152"/>
                Voltar Painel
            </Link>
        </div>
    );
}