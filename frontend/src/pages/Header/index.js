import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogOut} from 'react-icons/fi'

import './styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


export default function Header(){

    const name  = localStorage.getItem('name');

    const history = useHistory();

    function handleLogout() {

        localStorage.clear();
        history.push('/');

    }

    return(
        <div className="topnav">
            <Link to="/painel">.Cardapio Digital</Link>
            <div className="login-container">
                <input type="text" placeholder={name} name="username" disabled={true}/>
                <button type="submit" onClick={handleLogout}> <FiLogOut size={14} style={{ marginLeft: 10}} color="#FFF"/></button>
            </div>
        </div>
    );
}