import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiTrash2, FiPlus, FiSave, FiX, FiAlertTriangle, FiXCircle, FiEye} from 'react-icons/fi'

import Header from '../Header'
import Footer from '../Footer'

import api from '../../services/api'

import './styles.css';


export default function Painel() {

    const [cardapio, setCardapio] = useState([]);
    const [hidenCardapio, setHidenCardapio] = useState(true);
    const [hidenProduto, setHidenProduto] = useState(true);
    const token = localStorage.getItem('token');
    const [nomeCardapio, setNomeCardapio] = useState('');
    const [descricaoCardapio, setDescricaoCardapio] = useState('');

    const [idCadProduto, setCadProduto] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [descProduto, setDescProduto] = useState('');
    const [valorProduto, setValorProduto] = useState('');


    const history = useHistory();

    useEffect(() => {
        if (token) {

            getAll();
            localStorage.setItem('login', true);

        } else {
            history.push("/");
        }
        
        async function getAll() {
            await api.get('cardapio/all', {
                headers: {
                    Authorization: token,
                }
            }).then(response =>{
                setCardapio(response.data.cardapio);
            })

        }


    }, [token, history]);

    function Edit(id) {
        history.push(`/produto/${id}`);
    }

    async function CadastrarCardapio(e) {
        const token = localStorage.getItem('token');
        e.preventDefault();

        const data = {
            nome: nomeCardapio,
            descricao: descricaoCardapio,
        }

        await api.post('cardapio/create', data, {
                headers: {
                    Authorization: token,
            }
        }).then(response => {
            history.push('/painel');
        })
    }


    async function CadastrarProduto(e) {
        e.preventDefault();

        if(idCadProduto === '') {
            setHidenProduto(false);
            alert('Selecione um cardápio');
        } else {

            const data = {
                nome: nomeProduto,
                descricao: descProduto,
                valor: valorProduto,
                id: idCadProduto
            }

            await api.post('produto/create', data, {
                headers: {
                    Authorization: token
                }
            }).then(response => {
                setHidenProduto(true);
                
            })

        }
    }

    return(
        <div className="painel-container">
            <Header />
            <div className="painel-container-add">
                <button onClick={() => setHidenCardapio(false)}><FiPlus size={25}/> Cardápio</button>
                <button onClick={() => setHidenProduto(false)}><FiPlus size={25}/> Produto</button>
            </div>
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
                        {cardapio.Produto === null? '': <FiEye size={20} color="#a8a8b3" />}
                    </button>
                    {cardapio.Produto === null? <span className="alert-danger"><FiAlertTriangle style={{ marginRight: 10}}/>N/Produto</span> : ''} 
                </li>     
            ))}
            </ul>
            <div className="content save-cardapio" hidden={hidenCardapio}>
                <Link to="#" style={{ marginLeft: 800 }} onClick={() => setHidenCardapio(true)}>
                    <FiX size={20} color="#272727"/>
                </Link>
                <form onSubmit={CadastrarCardapio}> 
                    <input 
                    placeholder="Nome do cardápio" 
                    value={nomeCardapio}
                    onChange={e => setNomeCardapio(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição do Cardápio"
                        value={descricaoCardapio}
                        onChange={e => setDescricaoCardapio(e.target.value)}
                    />                    
                    <button className="button" type="submit"><FiSave size={18} color="#FFF"/> Gravar</button>
                </form>
            </div>
                <form onSubmit={CadastrarProduto} hidden={hidenProduto}>
                    <div className="form-produto">
                        <Link to="#" className="fix-close" onClick={() => setHidenProduto(true)}>
                            <FiXCircle size={20} color="#272727"/>
                        </Link>
                        <select onChange={e => setCadProduto(e.target.value)}>
                                <option value="">Selecione um cardápio...</option>
                            {cardapio.map(cardapio => (
                                <option key={cardapio.id} value={cardapio.id}>{cardapio.nome}</option>
                            ))}
                        </select>
                        <input 
                            placeholder="Nome do Produto" 
                            value={nomeProduto}
                            onChange={e => setNomeProduto(e.target.value)}
                        />
                        <textarea 
                            placeholder="Descrição do Produto" 
                            value={descProduto}
                            onChange={e => setDescProduto(e.target.value)}
                        />
                        <input 
                            placeholder="R$ 0,00" 
                            value={valorProduto}
                            onChange={e => setValorProduto(e.target.value)}
                        />
                        <button  className="button" type="submit">Incluir</button>
                    </div>  
                </form>
            <Footer/>
        </div>
    );
}