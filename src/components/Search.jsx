import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SearchBar } from './SearchBar';
import { fetchStocks } from '../api'
import {fetchingFromApi, fetchingFail, fetchingSuccess} from '../actions/action_creators'

const Search = React.createClass({
    render: function(){
        return(
            <SearchBar {...this.props} />
        )
    }

});
export default Search;

const mapStateToProps = function(state){
  //console.log(state)
  return{
    //searchCriteria: state.searchCriteria,
    stock: state.get('stock'),
    // func: state.search.func,
    result: state.get('result'),
    isFetching: state.get('isFetching'),
    //fetchError: state.fetchError
  }
}

const mapDispatchToProps = function(dispatch){
  return{
    actions: bindActionCreators({fetchingFromApi, fetchingFail, fetchingSuccess}, dispatch),
    //fetchStocks: fetchStocks
  }
}

export const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);