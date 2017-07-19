import React from 'react';
import ReactDOM from 'react-dom';
import { List, Map } from 'immutable';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { Router, Route, BrowserRouter, IndexRoute, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();
import reducer from './reducers/reducer';
import {AppContainer} from './components/App';
import { NavBarContainer } from './components/NavBar';
import { HomeContainer } from './components/Home';
import { SearchBarContainer} from './components/SearchBar';

import axios from 'axios'; // hacer requests http

// https://daveceddia.com/ajax-requests-in-react/
// import 'normalize.css'; // 


//to use Redux-Dev Tools
const createStoreDevTools = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);
//Instantiate new redux store
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);
//const store = createStoreDevTools(reducer);

const getPortafolio = function () {
    return axios.get('http://127.0.0.1:3000/portfolios/596de5f4946bf6c3fb2fd999');
};
const getResponsables = function () {
    return axios.get('/api/personas');
};
const getCategorias = function () {
    return axios.get('/api/categorias');
};
//conccurent requests
axios.all([getPortafolio()]).then(axios.spread(function (portafolio) {
    store.dispatch({
        type: 'SET_STATE',
        state: {
            currentCashBalance: portafolio.data.data.currentCashBalance,
            items: portafolio.data.data.portfolio,
        }
    });
    //console.log(portafolio)
})).catch(function (error) {
    store.dispatch({
        type: 'SET_STATE',
        state: {
            dbError: true 
        }
    });
    console.error(error.message);
});

store.dispatch({
    type: 'SET_STATE',
    state: {

        headers:['Ticker', 'Nombre', 'Precio ($)', 'Cantidad', 'Fecha', 'Precio Actual ($)', 'Rendimiento (%)', 'Valor Actual', ''],
        title: 'Portafolio',
        iconName: 'glyphicon glyphicon-book',
        
    }
});
{/*<Route path='/search' component={InventoryFormContainer} />*/}
        {/*<Route path='/faq' component={InventoryFormContainer} />*/}
const routes =
  <div>
    <AppContainer/>
    
  </div>  

/*
const items = List.of(
    Map({id: 1, placa: 380167, codigo: 'HP42066669', marca: 'HP', modelo: 'ProBook 11g'}),
    Map({id: 2, placa: 380168, codigo: 'HP42066669', marca: 'HP', modelo: 'ProBook 11g'})
);
const headers = List.of(Array('Id', 'Placa', 'Código', 'Marca', 'Modelo')); */
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history = {history}>{routes}</BrowserRouter>
    </Provider>,
    document.getElementById('root'),

);