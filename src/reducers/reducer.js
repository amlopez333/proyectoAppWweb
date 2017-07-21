import { Map } from 'immutable';
import { getTodayWithFormat, getToday } from '../utils/date.js';
import axios from 'axios'; // hacer requests http
import { browserHistory } from 'react-router'
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
const updateSearchSuccess = function(state, stock, result, isFetching){
    console.log(stock)
    return state.merge(state, {stock: stock, result: result, isFetching: isFetching})
}
const updateSearchIsFetching = function(state, isFetching){
    console.log(state.get('isFetching'))
    return state.merge(state, {isFetching: isFetching})
}
const updateSearchFailed= function(state, isFetching, fetchFail, result){
    console.log(state.get('isFetching'))
    return state.merge(state, {isFetching: isFetching, fetchFail: fetchFail, result: result})
}

const logout = function(state){
    return state.merge(state, {userId: ''})
}
const login = function(state, userId){
    browserHistory.push('/portfolio');
    return state.merge(state, {userId: userId})
}
const register = function(state){
    browserHistory.push('/');
    return state;
}
const getPortfolio = function(state, currentCashBalance, items){
    //browserHistory.push('/portfolio');
    return state.merge(state, {currentCashBalance: currentCashBalance, items: items})
}
const sell = function(state){
    return state.merge(state, {currentCashBalance: ''})
}
var headerChange = function (state, title, desc, iconNm) {
    return state.set('title', title).set('description', desc).set('iconName', iconNm);
};

var reducer = function (state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case "SEARCH_SUCCESS":
            console.log(action);

            /*{state,
                stock: action.stock,
                result: action.result !== undefined ? action.result:null,
                isFetching: false,
                fetchError: false}*/
            return updateSearchSuccess(state, action.stock, action.result, false);
                
        case "LOG_OUT":
            return logout(state);
        case "LOG_IN":
            return login(state, action.userId);
        case "REGISTER":
                return register(state)
        case "GET_PORTFOLIO":
            return getPortfolio(state, action.currentCashBalance, action.items);
        case "SELL":
            return sell(state);        
        case "SEARCH_FAILED":
            console.log('FAIL')
            return updateSearchFailed(state, false, action.fetchFail, undefined)
               
        case "SEARCH_IS_FETCHING":
            //console.log('FETCH')
            return updateSearchIsFetching(state, true)
            /*{
                state,
                isFetching: true
            }*/
        default: return state;

    };
};



export default reducer;