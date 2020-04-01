import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { 
    FiUser, 
    FiArrowLeft, 
    FiSave,
} from 'react-icons/fi';

import './styles.css';

import api from '../../services/api'

export default function Produto(props) {

    const id = props.match.params.id

    const name  = localStorage.getItem('name');
    const token = localStorage.getItem('token');

    const [nomeCardapio, setNomeCardapio] = useState();
    const [descricao, setDescricao] = useState();

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


    }, []);

    return(
        <div className="new-cardapio-container">
            <div className="header">
                <h1>.Cardápio Digital</h1> 
                <span> <FiUser size={18} color="#FFF" />Usuário(a), {name}</span>
            </div>
            <Link className="back-link-card" to="/painel">
                <FiArrowLeft size={16} color="#545152"/>
                Voltar Painel
            </Link>
            <div className="content">
                <form onSubmit={() => {}}> 
                    <input 
                        style={{ backgroundColor: '#e2e2e8'}}
                        placeholder={nomeCardapio} 
                        disabled = "disabled"
                    />
                    <textarea 
                        style={{ backgroundColor: '#e2e2e8'}}
                        placeholder={descricao}
                        disabled = "disabled"
                    />                    
                </form>
            </div>
        </div>
    );
}