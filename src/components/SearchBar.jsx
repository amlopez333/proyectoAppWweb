import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchStock} from '../actions/searchActions'
import Graphic from './Graphic';
//import loading from '../loading.jpg'

class SearchBar extends Component{
  stockSearch(event){
    event.preventDefault();
    //console.log('SEARCH')
    
    if(this.refs.fn.value.toString() === "TIME_SERIES_INTRADAY"){
      console.log(this.refs.fn.value);
      return this.props.fetchStocks(this.refs.fn.value, this.refs.search.value)
    }
    return this.props.fetchStocks(this.refs.fn.value, this.refs.search.value)
  }  
  render(){
    //no loading message while fetching?
    if(this.props.isFetching === true){
      return(  
          <div style={{marginLeft:'15%'}}>        
          <br />
          <form onSubmit={this.stockSearch.bind(this)}>
            <label>Búsqueda</label>
            <br />
            <input placeholder="Stock" type="text" ref="search"/> 
            <select placeholder="function" ref="fn" >
              <option value="TIME_SERIES_INTRADAY">Current</option>
              <option value="TIME_SERIES_DAILY">Daily</option>
              <option value="TIME_SERIES_WEEKLY">Weekly</option>
              <option value="TIME_SERIES_MONTHLY">Monthly</option>
            </select>
            <button type="submit">Buscar</button>
          </form>            
          <br />
          <img src='../loading.jpg' alt="" className="App-logo" style={{marginLeft:'15%'}}/>
          </div> 
      )
    }else{
      //initial load or fetch failed
      if(!this.props.result || this.props.result === null){      
        return (
          <div style={{marginLeft:'15%'}}>        
          <br />
          <form onSubmit={this.stockSearch.bind(this)}>
            <label>Búsqueda</label>
            <br />
            <input placeholder="Stock" type="text" ref="search"/> 
            <select placeholder="function" ref="fn" >
              <option value="TIME_SERIES_INTRADAY">Current</option>
              <option value="TIME_SERIES_DAILY">Daily</option>
              <option value="TIME_SERIES_WEEKLY">Weekly</option>
              <option value="TIME_SERIES_MONTHLY">Monthly</option>
            </select>
            <button type="submit">Buscar</button>
          </form>            
          <br />
          </div>  
        )
      }else{
        //fetch successful
        return (
          <div style={{marginLeft:'15%'}}>        
          <br />
          <form onSubmit={this.stockSearch.bind(this)}>
            <label>Búsqueda</label>
            <br />
            <input placeholder="Stock" type="text" ref="search"/> 
            <select placeholder="function" ref="fn">
              <option value="TIME_SERIES_INTRADAY">Current</option>
              <option value="TIME_SERIES_DAILY">Daily</option>
              <option value="TIME_SERIES_WEEKLY">Weekly</option>
              <option value="TIME_SERIES_MONTHLY">Monthly</option>
            </select>
            <button type="submit">Buscar</button>
          </form>            
          <br />
          <Graphic stock = {this.props.stock} result = {this.props.result}/>
          <div id="chart"></div>
        </div>  
        )
      }    
    }    
  }
}

const mapStateToProps = function(state){
  return{
    searchCriteria: state.searchCriteria,
    stock: state.stock,
    // func: state.search.func,
    result: state.result,
    isFetching: state.isFetching,
    fetchError: state.fetchError
  }
}

const mapDispatchToProps = function(dispatch){
  return{
    fetchStocks: function(fun, stk){
        dispatch(fetchStock(fun, stk))
    }
  }
}
//export default SearchBar;
export const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);