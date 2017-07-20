import React, {Component} from 'react';
import {connect} from 'react-redux'

import Graphic from './Graphic';
//import loading from '../loading.jpg'

export class SearchBar extends Component{
  constructor(props) {
    super(props);
    //this.state = {count: props.initialCount};
  }
  stockSearch(event){
    event.preventDefault();
    //console.log('SEARCH')
    
    if(this.refs.fn.value.toString() === "TIME_SERIES_INTRADAY"){
      //console.log(this.refs.fn.value);
      return this.props.fetchStocks(this.refs.fn.value, this.refs.search.value)
    }
    return this.props.fetchStocks(this.refs.fn.value, this.refs.search.value)
  }  
  render(){
    console.log(this.props.result)
    //no loading message while fetching?
    if(this.props.isFetching === true){
      return(  
          <div className="SearchForm">        
          <br />
          <form onSubmit={this.stockSearch.bind(this)}>
            <label className="Label">Búsqueda</label>
            <br />
            <input className="Input" placeholder="Stock" type="text" ref="search"/> 
            <select className="Input" placeholder="function" ref="fn" >
              <option value="TIME_SERIES_INTRADAY">Current</option>
              <option value="TIME_SERIES_DAILY">Daily</option>
              <option value="TIME_SERIES_WEEKLY">Weekly</option>
              <option value="TIME_SERIES_MONTHLY">Monthly</option>
            </select>
            <button className="Button" type="submit">Buscar</button>
          </form>            
          <br />
          <img src='./loading.jpg' alt="" className="App-logo" style={{marginLeft:'15%'}}/>
          </div> 
      )
    }else{
      //initial load or fetch failed
      if(!this.props.result || this.props.result === null){      
        return (
          <div className="SearchForm">        
          <br />
          <form onSubmit={this.stockSearch.bind(this)}>
            <label className="Label">Búsqueda</label>
            <br />
            <input className="Input" placeholder="Stock" type="text" ref="search"/> 
            <select className="Input" placeholder="function" ref="fn" >
              <option value="TIME_SERIES_INTRADAY">Current</option>
              <option value="TIME_SERIES_DAILY">Daily</option>
              <option value="TIME_SERIES_WEEKLY">Weekly</option>
              <option value="TIME_SERIES_MONTHLY">Monthly</option>
            </select>
            <button className="Button" type="submit">Buscar</button>
          </form>            
          <br />
          </div>  
        )
      }else{
        //fetch successful
        return (
          <div className="SearchForm">        
          <br />
          <form onSubmit={this.stockSearch.bind(this)}>
            <label className="Label">Búsqueda</label>
            <br />
            <input className="Input" placeholder="Stock" type="text" ref="search"/> 
            <select className="Input" placeholder="function" ref="fn">
              <option value="TIME_SERIES_INTRADAY">Current</option>
              <option value="TIME_SERIES_DAILY">Daily</option>
              <option value="TIME_SERIES_WEEKLY">Weekly</option>
              <option value="TIME_SERIES_MONTHLY">Monthly</option>
            </select>
            <button className="Button" type="submit">Buscar</button>
          </form>            
          <br />
          <Graphic stock = {this.props.stock} result = {this.props.result}/>
        </div>  
        )
      }    
    }    
  }
}


export default SearchBar;
