import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom'
import CafesCru from './pages/CafesCru';
import EditarFazendas from './pages/EditarFazendas';
import Fazendas from './pages/Fazendas';
import Landing from './pages/Landing';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/cafecru" component={CafesCru} />
            <Route path="/fazendas" component={Fazendas} />
            <Route path="/editfazendas/:id" component={EditarFazendas} />
        </BrowserRouter>
    )
}

export default Routes


