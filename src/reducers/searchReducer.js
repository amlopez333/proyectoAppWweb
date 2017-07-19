
const initialState = {
    stock: '',
    isFetching: false,
    fetchError: false,
    result: null
}

export default function reducer (state = initialState, action){
    //console.log('switch')
    switch (action.type){       
        case "SEARCH_SUCCESS":
            //console.log('SUCC')
            return{
                ...state,
                stock: action.payload.stk,
                result: action.payload.result !== undefined ? action.payload.result:null,
                isFetching: false,
                fetchError: false
            }
        case "SEARCH_FAILED":
            //console.log('FAIL')
            return{
                ...state,
                isFetching: false,
                fetchError: action.fetchFail,
                result: null
            }
        case "SEARCH_IS_FETCHING":
            //console.log('FETCH')
            return{
                ...state,
                isFetching: true
            }
        default: return state;
    }
}