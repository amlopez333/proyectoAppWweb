import React, {Component} from 'react';
import {connect} from 'react-redux'
import Graphic from './Graphic';
import CustomModal from './CustomModal';
import StockInfo from './StockInfo';
import axios from 'axios';
import {round10} from '../utils/math'
//import loading from '../loading.jpg'

export class SearchBar extends Component{
  constructor(props) {
    super(props);
    this.state = {showModal: false};
    this.executeTransaction = this.executeTransaction.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.buyOperation = this.buyOperation.bind(this);
    this.isValidBuy = this.isValidBuy.bind(this)
  }
  open(item, currentPrice) {
        
        this.setState({ showModal: true });
        //console.log(this.state.item)
  }
  close() {
      return this.setState({ showModal: false });
  }
  executeTransaction(cantidad, currentPrice){
      this.setState({ showModal: false })
      console.log('COMPRADO')
      //axios call should return action
      if(this.props.result && currentPrice && cantidad){
          const ticker = this.props.stock;
          const name = this.props.stock;
          const price = currentPrice;
          const amount = cantidad
          const userId = this.props.userId
          axios.post('/buy/' + userId, {
              ticker: ticker,
              name: name,
              price: price,
              amount: amount
          }).then(function(result){

              return this.props.actions.buy();
          }.bind(this)).catch(function(error){
              console.log(error)
          })
      }
      
  }
  buyOperation(currentCashBalance, cantidad, price){
      if(cantidad <= 0){
          return currentCashBalance;
      }
      return round10(currentCashBalance - cantidad * price - 6.75)
  }
  isValidBuy(cantidad){
      if(this.props.result){
          if(cantidad <= 0){
              return false;
          }
          return true;
      }
      return false;
  }

  stockSearch(event){
    event.preventDefault();
    //console.log('SEARCH')
    console.log('blasda')
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
      console.log(error)
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
              <option value="TIME_SERIES_INTRADAY">Actual</option>
              <option value="TIME_SERIES_DAILY">Diario</option>
              <option value="TIME_SERIES_WEEKLY">Semanal</option>
              <option value="TIME_SERIES_MONTHLY">Mensual</option>
            </select>
            <button className="Button" type="submit">Buscar</button>
          </form>            
          <br />
          <img src = './loading.jpg' alt="" className="App-logo"/>
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
              <option value="TIME_SERIES_INTRADAY">Actual</option>
              <option value="TIME_SERIES_DAILY">Diario</option>
              <option value="TIME_SERIES_WEEKLY">Semanal</option>
              <option value="TIME_SERIES_MONTHLY">Mensual</option>
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
              <option value="TIME_SERIES_INTRADAY">Actual</option>
              <option value="TIME_SERIES_DAILY">Diario</option>
              <option value="TIME_SERIES_WEEKLY">Semanal</option>
              <option value="TIME_SERIES_MONTHLY">Mensual</option>
            </select>
            <button className="Button" type="submit">Buscar</button>
            <button className="Button" type="button" onClick={this.open}>Comprar</button>
          </form>            
          <br />
          <StockInfo ticker = {this.props.stock || ''} item = {this.props.result}/>
          <Graphic stock = {this.props.stock} result = {this.props.result}/>
          <CustomModal ticker = {this.props.stock} currentCashBalance = {this.props.currentCashBalance} transaction = 'Compra'
          item = {this.props.result || ''}  showModal = {this.state.showModal} onClose = {this.close} 
          executeTransaction = {this.executeTransaction} operation = {this.buyOperation} 
          isValid = {this.isValidBuy}/>
        </div>  
        )
      }    
    }    
  }
}


export default SearchBar;
