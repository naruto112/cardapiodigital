import React, { useState, useEffect } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './styles.css';


import cardapioImg from '../../assets/logo_menu.png';

export default function Logon() {

    const [user, setUser] = useState('');
    const [passwd, setPasswd] = useState('');

    const token = localStorage.getItem('token');
    
    const history = useHistory();


    useEffect(() => {
        if(token){
            history.push("/painel")
        }
    }, [token, history]);


    async function handleLogin(e){
        e.preventDefault();

        try{
            
            const response = await api.post('user/login', { 
                user,
                passwd 
            });

            const { result } = response.data;

            localStorage.setItem('token', result[0].token);
            localStorage.setItem('name', result[0].name);
            
            history.push('/painel');

        }catch(err){
            alert('ERROR:', err);
        }
    }

    return(
        <div>
            <div className="logon-container">
                <section className="form">
                    <h1>.Cardápio Digital</h1>
                    <form onSubmit={handleLogin}>
                        <h2>Faça seu Logon</h2>
                        <input 
                            placeholder="Seu usuário"
                            value={user}
                            onChange={e => setUser(e.target.value)}
                        />
                        <input 
                            type="password"
                            placeholder="Digite a senha"
                            value={passwd}
                            onChange={e => setPasswd(e.target.value)}
                        />
                        <button className="button" type="submit">Entrar</button>
                        <Link className="back-link" to="/register">
                            <FiLogIn size={16} color="#545152"/>
                            Criar um cadastro
                        </Link>
                    </form>
                </section>
                <img src={cardapioImg} alt="CardDigital"/>
            </div>
        </div>
    );
}