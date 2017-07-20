import React from 'react';
import axios from 'axios';
import { Button, ButtonGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { round10 } from '../utils/math';
import { formatDate } from '../utils/date';
import api from '../api';
const PortfolioItem = React.createClass({
    getInitialState: function(){
        return {currentPrice: 0}
    },
    sellItem: function (evt) {
        //console.log('atun');
        //console.log(this.props.item);
        return this.props.openSellModal(this.props.item);
    },
    getCurrentPrice: function(){
        let encodedURI = window.encodeURI('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+this.props.item.get('ticker')+'&interval=1min&apikey=K7S08RRI532JTVS3');
        return axios.get(encodedURI)
        .then( (response)=>{
            
            let data = response.data['Time Series (1min)'];
            let currentData = Object.keys(data)[0];
            //console.log(Object.keys(data));
            //console.log(data[currentData]['4. close']);
            let currentPrice = round10(parseFloat(data[currentData]['4. close']));
            return this.setState({currentPrice: currentPrice});
        }).catch(function(error){
            console.log(error);
        })
    },
    componentDidMount: function(){
        this.getCurrentPrice();
        return setInterval(this.getCurrentPrice, 60000)
    },
    render: function () {
        console.log(this.props.item)
        return (
            <tr className="clickable-row">
                {/*<td>  this.props.item.get('id')  </td>  el header id esta oculto  */}
                <td>{this.props.item.get('ticker')}</td>
                <td>{this.props.item.get('name')}</td>
                <td>{this.props.item.get('price')}</td>
                <td>{this.props.item.get('amount')}</td>
                <td>{formatDate(this.props.item.get('dateBought'))}</td>
                <td>{this.state.currentPrice}</td>
                <td className = {this.state.currentPrice - parseFloat(this.props.item.get('price')) >= 0.0 ? 'positive' : 'negative'}>
                    {round10(Math.abs((this.state.currentPrice - parseFloat(this.props.item.get('price')))) / this.props.item.get('price') * 100) }</td>
                <td>{this.props.item.get('amount') * this.state.currentPrice}</td>
                <td> {/*Acciones*/}
                    <div className="table-Button">
                        <ButtonGroup bsSize="small" > 
                            <Button className="ListButton" onClick={this.sellItem}>Vender</Button>
                        </ButtonGroup>
                    </div>
                </td>
            </tr>
        );
    }
});
export default PortfolioItem;