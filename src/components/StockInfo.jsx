import React from 'react';
import {round10} from '../utils/math'; 

const StockInfo = React.createClass({
    render: function(){
        let ticker;
        if(this.props.ticker){
           ticker = this.props.ticker.toUpperCase();
        }
        let keys = Object.keys(this.props.item.toJS()).sort()
        let currentPrice = round10(this.props.item.get(keys[keys.length -1]).get('4. close'));
        let openPrice = round10(this.props.item.get(keys[keys.length -1]).get('1. open'));
        let highPrice = round10(this.props.item.get(keys[keys.length -1]).get('2. high'));
        let lowPrice = round10(this.props.item.get(keys[keys.length -1]).get('3. low'));
        return (
            <dl className="Transaction">
                <dt>Ticker</dt>
                <dd className="TransactionValue">{ticker}</dd>
                <dt>Precio de apertura</dt>
                <dd className="TransactionValue">{'$' + openPrice}</dd>
                <dt>Precio actual</dt>
                <dd className="TransactionValue">{'$' + currentPrice}</dd>
                <dt>Precio alto</dt>
                <dd className="TransactionValue">{'$' + highPrice}</dd>
                <dt>Precio bajo</dt>
                <dd className="TransactionValue">{'$' + lowPrice}</dd>
            </dl>
        )
    }
});
export default StockInfo;