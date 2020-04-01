import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { 
    FiUser, 
    FiArrowLeft, 
    FiSave,
} from 'react-icons/fi';

import api from '../../services/api'

import './styles.css';


export default function Cardapio() {

    const name = localStorage.getItem('name')
    const [nomeCardapio, setNomeCardapio] = useState('');
    const [descricao, setDescricao] = useState('');
    const history = useHistory();


    async function CadCardapio(e) {
        const token = localStorage.getItem('token');

        e.preventDefault();

        const data = {
            nome: nomeCardapio,
            descricao: descricao,
        }

        await api.post('cardapio/create', data, {
                headers: {
                    Authorization: token,
            }
        }).then(response =>{
            history.push('/painel');
        })
    }

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
                <form onSubmit={CadCardapio}> 
                    <input 
                    placeholder="Nome do cardápio" 
                    value={nomeCardapio}
                    onChange={e => setNomeCardapio(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição do Cardápio"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />                    
                    <button className="button" type="submit"><FiSave size={18} color="#FFF"/> Gravar</button>
                </form>
            </div>
        </div>
    );
}