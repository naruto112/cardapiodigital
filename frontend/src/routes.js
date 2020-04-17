import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Logon from './pages/Logon';
import Register from './pages/Register';
import Painel from './pages/Painel';
import Cardapio from './pages/Cardapio'

import Produto from './pages/Produto'

export default function Routes() {
    return(
        <BrowserRouter>
         <Switch>
             <Route path="/" exact component={Logon} />
             <Route path="/painel" component={Painel} />
             <Route path="/register" component={Register} />
             <Route path="/produto/:id" component={Produto} />
             <Route path="/cardapio" component={Cardapio} />
         </Switch>
        </BrowserRouter>
    )
}