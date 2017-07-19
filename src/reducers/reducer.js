import { Map } from 'immutable';
import { getTodayWithFormat, getToday } from '../utils/date.js';
import axios from 'axios'; // hacer requests http

//utility functions
var getItemIndex = function (state, itemId) {
    return state.get('items').findIndex(function (item) {
        return item.get('id') === itemId;
    });
};

var getNextItemId = function (state) {
    return state.get('items').reduce(function (maxId, item) {
        return Math.max(maxId, item.get('id'))
    }, 0) + 1;
};
//

var setState = function (state, newState) {
    return state.merge(newState);
};

var search = function (state, filter) {
    if (filter) {
        return state.set('filter', filter);
    }
    return state;
};

var cancelSearch = function (state) {
    return state.set('filter', 'all')
};

var updateRevisionDate = function (state, itemId, date) {
    const itemIndex = getItemIndex(state, itemId);
    const updatedItem = state.get('items').get(itemIndex).set('ultimarevision', date);
    axios.put('/api/revisiones/' + itemId).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.error(error.message);
    });
    return state.update('items', function (items) {
        return items.set(itemIndex, updatedItem);
    });
}

var addItem = function (state, placa, codigo, marca, modelo, ubicacion, responsable, idResponsable, categoria, idCategoria, descripcion) {
    if (!placa && !marca) {
        console.log('no marca o placa');
        return state;
    };
    // let addsuccess = false;

    // state contains all the items:
    // console.log( state + " on reducer before" )

    const itemId = getNextItemId(state);
    const ultimaRevision = getTodayWithFormat();
    console.log(ultimaRevision);
    const newItem = Map({ 
        id: itemId,
        placa: placa, 
        marca: marca, 
        modelo: modelo, 
        categoria: categoria, 
        ubicacion: ubicacion,
        codigo: codigo,
        responsable: responsable, 
        ultimarevision: ultimaRevision, 
        descripcion: descripcion });
    console.log(newItem.toJS());
    return state.update('items', function (items) {
        return items.concat([newItem]);
    });
    // return state;
    //ajax call

};

var headerChange = function (state, title, desc, iconNm) {
    return state.set('title', title).set('description', desc).set('iconName', iconNm);
};

var reducer = function (state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case "SEARCH_SUCCESS":
            //console.log('SUCC')
            return{
                state,
                stock: action.payload.stk,
                result: action.payload.result !== undefined ? action.payload.result:null,
                isFetching: false,
                fetchError: false
            }
        case "SEARCH_FAILED":
            //console.log('FAIL')
            return{
                state,
                isFetching: false,
                fetchError: action.fetchFail,
                result: null
            }
        case "SEARCH_IS_FETCHING":
            //console.log('FETCH')
            return{
                state,
                isFetching: true
            }
        default: return state;

    };
};



export default reducer;