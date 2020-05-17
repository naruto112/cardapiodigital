import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Logon from './pages/Logon';
import Register from './pages/Register';
import Cadastro from './pages/Register/Cadastro'
import Painel from './pages/Painel';
import Cardapio from './pages/Cardapio'
import Loja from './pages/Loja'

export default function Routes() {

    return(
        <BrowserRouter>
         <Switch>
             <Route path="/" exact component={Logon} />
             <Route path="/painel" component={Painel} />
             <Route path="/register" component={Register} />
             <Route path="/cadastro/:id" component={Cadastro} />
             <Route path="/cardapio" component={Cardapio} />
             <Route path="/loja/:name" component={Loja} />
         </Switch>
        </BrowserRouter>
    )
}