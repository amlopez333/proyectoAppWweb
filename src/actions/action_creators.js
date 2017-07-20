export var setState = function(state) {
    return {
        type: 'SET_STATE',
        state
    };
};


export const logout = function(){
    return{
        type: 'LOG_OUT'
    }
}
export const login = function(userId){
    return{
        type: 'LOG_IN',
        userId
    }
}
export const register = function(){
    return {
        type: 'REGISTER'
    }
}
export const sell = function(){
    return {
        type: 'SELL'
    }
}
export const buy = function(){
    return {
        type: 'BUY'
    }
}

export const getPortfolio = function(currentCashBalance, items){
    return{
        type: 'GET_PORTFOLIO',
        currentCashBalance,
        items
    }
}

import api from '../api'

export function fetchStock(fun, stock){
    return dispatch => {
        //console.log('fetch')
        dispatch(fetchingFromApi());
        return api.fetchStocks(fun, stock)
        .then(response => {
            dispatch(fetchingSuccess(stock, response))
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

export function fetchingSuccess(stock, result){
    console.log('fetchSuccess')
    return{
        type: 'SEARCH_SUCCESS',
        stock,
        result
        
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