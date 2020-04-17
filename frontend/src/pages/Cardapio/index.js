import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBInput,
    MDBBtn, 
} from 'mdbreact';


import Header from '../Header'
import Footer from '../Footer'
import api from '../../services/api'

import './styles.css'

export default function Cardapio(){

    const token = localStorage.getItem('token');
    const id = localStorage.getItem('user_id');

    const history = useHistory();

    const [cardapio, setCardapio] = useState([]);
    const [selected, setSelected] = useState('');
    const [url, setURL] = useState('');

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

    function handleSubmit(e){
        e.preventDefault();

        console.log(selected);
    }

    return(
        <div>
            <Header />
            <MDBContainer>
            <MDBRow>
                <MDBCol md="12">
                <form className="top" onSubmit={handleSubmit}>
                    <p className="h5 text-center mb-4">Escolha o cardápio e LET'S GO</p>
                    <div className="grey-text">
                    <select className="mdb-select md-form" value={selected} onChange={e => setSelected(e.target.value)}>
                        <option value="" disabled>Selecione o cardapio...</option>
                        {cardapio.map(cardapio => (
                            <option key={cardapio.id} value={cardapio.id}>{cardapio.nome}</option>
                        ))}
                    </select>
                    <MDBInput label="Digite o nome para sua URL" group type="text" />
                    </div>
                    <div className="text-center">
                    <MDBBtn color="dark" type="submit">SALVAR</MDBBtn>
                    </div>
                </form>
                </MDBCol>
            </MDBRow>
            </MDBContainer>
            <Footer />  
        </div>
    );

}