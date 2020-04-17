import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiTrash2, FiPlus, FiSave, FiX, FiAlertTriangle, FiXCircle, FiEye} from 'react-icons/fi'
import Loader from 'react-loader-spinner'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import Header from '../Header'
import Footer from '../Footer'
import Produto from '../Produto'

import api from '../../services/api'

import './styles.css';


export default function Painel() {

    const token = localStorage.getItem('token');
    const id = localStorage.getItem('user_id');

    const [loader, setLoader] = useState(false);

    const [cardapio, setCardapio] = useState([]);
    const [hidenCardapio, setHidenCardapio] = useState(true);
    const [hidenProduto, setHidenProduto] = useState(true);
    const [nomeCardapio, setNomeCardapio] = useState('');
    const [descricaoCardapio, setDescricaoCardapio] = useState('');

    const [idCardapio, setIdCardapio] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [descProduto, setDescProduto] = useState('');
    const [valorProduto, setValorProduto] = useState('');
    const [imgProduto, setImgProduto] = useState('');
    const [dataProduto, setDataProduto] = useState([]);


    const history = useHistory();

    useEffect(() => {
        if (token) {
            localStorage.setItem('login', true);
            getAll();
        } else {
            history.push("/");
        }
        
        async function getAll() {


            const data = { id }        

            await api.post('cardapio/all', data, {
                headers: {
                    Authorization: token,
                }
            }).then(response =>{
                setCardapio(response.data.cardapio);
            })

        }


    }, [token, history, id]);


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

            const data = {
                nome: nomeProduto,
                descricao: descProduto,
                valor: valorProduto,
                id: idCardapio,
                base64: imgProduto
            }

            await api.post('produto/create', data, {
                headers: {
                    Authorization: token
                }
            }).then(response => {
                setHidenProduto(true);
            })

    }

    async function onChange(e) {

        const file = e.target.files[0]
        // console.log(await toBase64(file));
        setImgProduto(await toBase64(file));  
    
    }

    async function getProduto(id) {

        setLoader(true);

        await api.get('produto', {
            headers: {
                Authorization: token,
            },
            params: {
                id
            }
        }).then(response => {
            setLoader(false);
            setDataProduto(response.data.produto);
        })

    }

    async function OpenHandlerProduto(id) {
        setIdCardapio(id);
        setHidenProduto(false);
    }


    //CONVERTE IMAGEM PARA BASE64
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    return(
        <div className="painel-container">
            <Header />
            <div className="painel-container-add">
                <Loader type="ThreeDots" color="#555555" height={100} width={100} className="loader" visible={loader} />
            </div>
            <button onClick={() => setHidenCardapio(false)} className="painel-container-button" ><FiPlus size={15}/></button>
            <div className="scroll-cardapio">
                <ul>
                {cardapio.map(cardapio => (
                    <li key={cardapio.id}>
                        <strong>NOME:</strong>
                        <p>{cardapio.nome}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{cardapio.descricao}</p>

                        <button className="btn-produto" onClick={() => OpenHandlerProduto(cardapio.id)} type="button">
                            <FiPlus size={15} color="#a8a8b3" />
                        </button>
                        <button className="btn-trash" onClick={() => {}} type="button">
                            <FiTrash2 size={15} color="#a8a8b3" />
                        </button>
                        <button className="btn-edit" onClick={() => getProduto(cardapio.id)} type="button">
                            {cardapio.Produto === null? '': <FiEye size={15} color="#a8a8b3" />}
                        </button>
                        {cardapio.Produto === null? <span className="alert-danger"><FiAlertTriangle style={{ marginRight: 10}}/>N/Produto</span> : ''} 
                    </li>     
                ))}
                </ul>
            </div>
            {/*---------------------------------------------------------------------------------------------------------------------------------------*/}
            <div className="content save-cardapio" hidden={hidenCardapio}>
                <Link to="#" style={{ marginLeft: 800 }} onClick={() => setHidenCardapio(true)}>
                    <FiX size={15} color="#272727"/>
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
                        <input 
                            value={idCardapio} 
                            onChange={() => setIdCardapio(cardapio.nome)}                            
                            hidden
                        />
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
                        <input 
                            type="file" 
                            style={{ border: 'none', marginTop: 30, marginLeft: -22}}
                            onChange={onChange}
                        />
                        <button  className="button" type="submit">Incluir</button>
                    </div>  
                </form>
                <Produto params={dataProduto} />
            <Footer/>
        </div>
    );
}