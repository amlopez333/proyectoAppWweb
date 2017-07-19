import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchStock} from '../actions/searchActions'
import Graphic from './Graphic';
import loading from './loading.jpg'

class SearchBar extends Component{
  stockSearch(event){
    event.preventDefault();
    //console.log('SEARCH')
<<<<<<< HEAD:src/components/SearchBar.jsx
    if(this.refs.fn.value === "TIME_SERIES_INTRADAY"){
      return this.props.fetchStocks(this.refs.fn.value, this.refs.search.value, '1min')
    }
    return this.props.fetchStocks(this.refs.fn.value,this.refs.search.value)
  }  
=======
    this.props.fetchStocks(this.refs.fn.value,this.refs.search.value)
  }
>>>>>>> c8b493e1d185e620daf2c72f66d50cb264810209:src/SearchBar.js
  render(){
    //no loading message while fetching?
    if(this.props.isFetching === true){
      return(  
          <div style={{marginLeft:'15%'}}>        
          <br />
<<<<<<< HEAD:src/components/SearchBar.jsx
          <input placeholder="Stock" type="text" ref="search"/> 
          <select placeholder="function" ref="fn">
            <option value = "TIME_SERIES_INTRADAY">Intraday</option>
            <option value = "TIME_SERIES_DAILY">Daily</option>
            <option value = "TIME_SERIES_WEEKLY">Weekly</option>
            <option value = "TIME_SERIES_MONTHLY">Monthly</option>
          </select>
          <button type="submit">Buscar</button>
        </form>            
        <br />
        </div>  
=======
          <form onSubmit={this.stockSearch.bind(this)}>
            <label>Búsqueda</label>
            <br />
            <input placeholder="Stock" type="text" ref="search"/> 
            <select placeholder="function" ref="fn" >
              <option value="TIME_SERIES_DAILY">Daily</option>
              <option value="TIME_SERIES_WEEKLY">Weekly</option>
              <option value="TIME_SERIES_MONTHLY">Monthly</option>
            </select>
            <button type="submit">Buscar</button>
          </form>            
          <br />
          <img src={loading} alt="" className="App-logo" style={{marginLeft:'15%'}}/>
          </div> 
>>>>>>> c8b493e1d185e620daf2c72f66d50cb264810209:src/SearchBar.js
      )
    }else{
      //initial load or fetch failed
      if(this.props.result === null){      
        return (
          <div style={{marginLeft:'15%'}}>        
          <br />
          <form onSubmit={this.stockSearch.bind(this)}>
            <label>Búsqueda</label>
            <br />
            <input placeholder="Stock" type="text" ref="search"/> 
            <select placeholder="function" ref="fn" >
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
              <option value="TIME_SERIES_DAILY">Daily</option>
              <option value="TIME_SERIES_WEEKLY">Weekly</option>
              <option value="TIME_SERIES_MONTHLY">Monthly</option>
            </select>
            <button type="submit">Buscar</button>
          </form>            
          <br />
          <Graphic />
          <div id="chart"></div>
        </div>  
        )
      }    
    }    
  }
}

const mapStateToProps = function(state){
  return{
    searchCriteria: state.get('searchCriteria'),
    // func: state.search.func,
    result: state.get('result'),
    isFetching: state.get('isFetching'),
    fetchError: state.get('fetchError')
  }
}

const mapDispatchToProps = function(dispatch){
  return{
    fetchStocks: function(fun,stk){
        dispatch(fetchStock(fun,stk))
    }
  }
}
//export default SearchBar;
export const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);