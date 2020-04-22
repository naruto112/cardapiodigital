import React from 'react'

import './styles.css';


export default function Produto(props) {
    
    return(
        <div className="new-produto-container">
            <div className="scroll-produto">
                {props.params.map(produtos => (
                    <div key={produtos.id} className="produto-ul">
                        <li className="grid">
                            <img src={produtos.base64} alt="cardapio digital" className="img-produto" width={140} height={150}/>
                            <span className="name-produto">{produtos.nome}</span>
                            <span className="description-produto">{produtos.descricao}</span>
                            <span className="price-produto">{produtos.valor}</span>
                        </li>
                    </div>
                ))}
            </div>
        </div>
    );
}