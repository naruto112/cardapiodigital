import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2, FiEdit3} from 'react-icons/fi'


import api from '../../services/api'

import './styles.css';


export default function Painel() {

    const [cardapio, setCardapio] = useState([]);
    const token = localStorage.getItem('token');
    const name  = localStorage.getItem('name');
    const history = useHistory();

    useEffect(() => {
        if (token) {
    
            api.get('cardapio/all', {
                headers: {
                    Authorization: token,
                }
            }).then(response =>{
                setCardapio(response.data.cardapio);
            })

        localStorage.setItem('login', true);

        } else {
            history.push("/");
        }

    }, [token, history]);

    function Edit(id) {
        history.push(`/produto/${id}`);
    }

    
    // async function handleDeleteIncident(id) {
        // try{
        //     await api.delete(`incidents/${id}`, {
        //         headers: {
        //             Authorization: ongId
        //         }
        //     })

        //     setIncidents(incidents.filter(incidents => incidents.id !== id ))
        // }catch(err){
        //     alert('Erro ao deletar caso, tente novamente.');
        // }
    // }

    function handleLogout() {

        localStorage.clear();
        history.push('/');

    }

    return(
        <div className="painel-container">
            <span>Bem Vindo(a), {name}</span>
            <header>
                {/* <img src={logoImg} alt="Be The Hero" /> */}
                <h1>.Cardápio Digital</h1>    
                <Link className="button" to="/cardapio">Cadastrar Cardápio</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Lista de Cardápios</h1>

            <ul>
            {cardapio.map(cardapio => (
                <li key={cardapio.id}>
                    <strong>NOME:</strong>
                    <p>{cardapio.nome}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{cardapio.descricao}</p>

                    <button className="btn-trash" onClick={() => {}} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                    <button className="btn-edit" onClick={() => Edit(cardapio.id)} type="button">
                        <FiEdit3 size={20} color="#a8a8b3" />
                    </button>
                </li>     
            ))}
            </ul>
        </div>
    );
}