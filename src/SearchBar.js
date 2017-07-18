import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchStock} from './actions/searchActions'
import Graphic from './Graphic';



class SearchBar extends Component{
  stockSearch(event){
    event.preventDefault();
    //console.log('SEARCH')
    this.props.fetchStocks(this.refs.fn.value,this.refs.search.value)
  }  
  render(){
    //no loading message while fetching?
    //initial load or fetch failed
    if(this.props.result === null){
      return (
        <div style={{marginLeft:'20%'}}>        
        <br />
        <form onSubmit={this.stockSearch.bind(this)}>
          <label>Búsqueda</label>
          <br />
          <input placeholder="Stock" type="text" ref="search"/> 
          <select placeholder="function" ref="fn">
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
        <div style={{marginLeft:'20%'}}>        
        <br />
        <form onSubmit={this.stockSearch.bind(this)}>
          <label>Búsqueda</label>
          <br />
          <input placeholder="Stock" type="text" ref="search"/> 
          <select placeholder="function" ref="fn">
            <option value="TIME_SERIES_DAILY">Daily</option>
            <option value="TIME_SERIES_WEEKLY">Weekly</option>
            <option value="TIME_SERIES_MONTHLY">Monthly</option>
          </select>
          <button type="submit">Buscar</button>
        </form>            
        <br />
        <Graphic />       
      </div>  
      )
    }    
  }
}

const mapStateToProps = state =>{
  return{
    stock: state.search.stock,
    // func: state.search.func,
    result: state.search.result,
    isFetching: state.search.isFetching,
    fetchError: state.search.fetchError
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    fetchStocks: (fun,stk) => dispatch(fetchStock(fun,stk))
  }
}
//export default SearchBar;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)