export var setState = function(state) {
    return {
        type: 'SET_STATE',
        state
    };
};

export var search = function(filter) {
    return {
        type: 'SEARCH',
        filter
    };
};

export var cancelSearch = function() {
    return {
        type: 'CANCEL_SEARCH'
    }
};

export var updateRevisionDate = function(itemId, date) {
    return {
        type: 'UPDATE_REVISION_DATE',
        itemId,
        date
    };
};

export var addItem = function(placa, codigo, marca, modelo, ubicacion, responsable, idResponsable, categoria, idCategoria, descripcion) {
    return {
        type: 'ADD_ITEM',
        placa,
        codigo,
        marca,
        modelo,
        ubicacion,
        responsable,
        idResponsable,
        categoria,
        idCategoria,
        descripcion
    };
};

import api from '../api'

export function fetchStock(fun, stk){
    return dispatch => {
        //console.log('fetch')
        dispatch(fetchingFromApi());
        return api.fetchStocks(fun, stk)
        .then(response => {
            //console.log('succ')
            dispatch(fetchingSuccess(stk, response))
        })
        .catch((errors) => {
            console.log(errors)
            dispatch(fetchingFail(true))
        })
  }
}

export function fetchingFromApi(){
    //console.log('fetchAPI')
    return{
        type: 'SEARCH_IS_FETCHING'
    }
}
export function fetchingFail(bool=false){
    //console.log('fetchFail: ', bool)
    return{
        type: 'SEARCH_FAILED',
        fetchFail: bool
    }
}

export function fetchingSuccess(stk,result){
    //console.log('fetchSuccess')
    return{
        type: 'SEARCH_SUCCESS',
        payload: {
            stk,
            result
        }
    }
}

export var headerChange = function(title, desc, iconNm) {
    return {
        type: 'HEADER_CHANGE',
        title,
        desc,
        iconNm
    };
};