import React, {Component} from 'react';
import {connect} from 'react-redux'
import Graphic from './Graphic';
import CustomModal from './CustomModal';
import axios from 'axios';
//import loading from '../loading.jpg'

export class SearchBar extends Component{
  constructor(props) {
    super(props);
    //this.state = {count: props.initialCount};
  }

  stockSearch(event){
    event.preventDefault();
    //console.log('SEARCH')
    const func = this.refs.fn.value;
    const stock = this.refs.search.value;
    let encodedURI;
    if(!func || !stock){
      return;
    }
    //console.log(func === "TIME_SERIES_INTRADAY");
    if(func === "TIME_SERIES_INTRADAY"){
        //console.log('chunga');
        encodedURI = window.encodeURI('https://www.alphavantage.co/query?function='+func+'&symbol='+stock+'&interval=1min&apikey=K7S08RRI532JTVS3');
    }
    else{
        encodedURI = window.encodeURI('https://www.alphavantage.co/query?function='+func+'&symbol='+stock+'&apikey=K7S08RRI532JTVS3');
    } 
    axios.get(encodedURI)
    .then( function(response){
        //console.log('fetch')
        //console.log(response.data['Time Series (Daily)'])
        let result;
        switch(func){
          case "TIME_SERIES_INTRADAY":
              result = response.data['Time Series (1min)']
              break
          case "TIME_SERIES_DAILY":
              result = response.data['Time Series (Daily)'];
              break;
          case "TIME_SERIES_WEEKLY":
              result = response.data['Weekly Time Series'];
              break;
          case "TIME_SERIES_MONTHLY":
              result = response.data['Monthly Time Series'];
              break;
          default:
              result = response.data['Time Series (Daily)'];
        }
        return this.props.actions.fetchingSuccess(stock, result)
    }.bind(this)).catch(function(error){
       
      return this.props.actions.fetchingFail(true)
    }.bind(this));
    return this.props.actions.fetchingFromApi();
  }  
  render(){
   
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
          <img src='./loading.jpg' alt="" className="App-logo"/>
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
