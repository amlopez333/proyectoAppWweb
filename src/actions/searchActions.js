import api from '../api'

export function fetchStock(fun, stk){
    return dispatch => {
        //console.log('fetch')
        dispatch(fetchingFromApi());
        return api.fetchStocks(fun,stk)
        .then(response => {
            //console.log('succ')
            dispatch(fetchingSuccess(stk, response))
        })
        .catch((errors) => {
            //console.log('fail')
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