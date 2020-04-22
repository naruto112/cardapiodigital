import React, { useEffect, useState } from 'react';

import './styles.css'
import Logo from '../../assets/backgroundCardapio.jpg';
import Loader from 'react-loader-spinner'

import api from '../../services/api'

export default function Loja(props) {

    const { name } = props.match.params;
    const token = localStorage.getItem('token');
    const [produtos, setProdutos] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() =>{

        handleMenuProduto(name);
        setLoader(true);

        async function handleMenuProduto(name) {

            api.get(`cardapio/loja/${name}`, {
                headers: {
                    Authorization: token,
                }
            }).then(resp =>{
                console.log(resp.data.loja);
                setProdutos(resp.data.loja);
                setLoader(false);
            })
            
        }

    }, [name, token]);
    
    

    return(
        <div>
            <div className="titulo-cardapio">
                .Cardapio Digital 🍔
            </div>
            <Loader type="ThreeDots" color="#555555" height={100} width={100} className="loading" visible={loader} />
            <div className="logo">
            {produtos.map(produto => (
                <div key={produto.id}>
                    <img src={produto.base64} alt="Burger" className="" width={120} height={120}/>
                    <span>
                        <label style={{ fontWeight: 'bold' }}>{produto.nome}</label>
                        <label style={{ color: '#8e8e8e' }}>{produto.descricao}</label>
                        <label>{produto.valor}</label>
                    </span>
                </div>
            ))}
            </div>
        </div>
        
    );
}