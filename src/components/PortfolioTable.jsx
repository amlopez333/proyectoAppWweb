import React from 'react';
import {Row, Table, Grid,  Col, Button} from 'react-bootstrap/lib';
import PortfolioHeader from './PortfolioHeader';
import PortfolioList from './PortfolioList';
//import SearchBar from './SearchBar';
import CustomModal from './CustomModal'
import { connect } from 'react-redux';
import { round10 } from '../utils/math'
import axios from 'axios';
const PortfolioTable = React.createClass({
    getInitialState: function () { 
        return {
            showModal: false
        };
    },
    open: function (item, currentPrice) {
        this.setState({ item: item });
        this.setState({currentPrice: currentPrice})
        this.setState({ showModal: true });
        //console.log(this.state.item)
    },
    close: function () {
        return this.setState({ showModal: false });
    },
    executeTransaction: function(cantidad){
        this.setState({ showModal: false })
        //axios call should return action
        if(this.state.item && this.state.currentPrice && cantidad){
            const portfolioId = this.state.item.get('_id');
            const ticker = this.state.item.get('ticker');
            const name = this.state.item.get('name');
            const price = this.state.currentPrice;
            const amount = cantidad
            const userId = this.props.userId
            axios.post('http://127.0.0.1:3000/sell/' + userId, {
                portfolioId: portfolioId,
                ticker: ticker,
                name: name,
                price: price,
                amount: amount
            }).then(function(result){

                return this.props.sell();
            }.bind(this)).catch(function(error){
                console.log(error)
            })
        }
        
    },
    sellOperation: function(currentCashBalance, cantidad, price){
        if(cantidad <= 0){
            return currentCashBalance;
        }
        return round10(currentCashBalance + cantidad * price - 6.75)
    },
    isValidSell: function(cantidad){
        if(this.state.item){
            if(this.state.item.get('cantidad') < cantidad || cantidad <=0){
                return false;
            }
            return true;
        }
        return false;
    },
    render: function () {
        //console.log(this.props.items);
        return (
            <Row className='show-grid'>
                <Col md={12}>
                    <Table bordered striped condensed responsive id="portfolio-table">
                        <PortfolioHeader headers={this.props.headers} />
                        <PortfolioList
                            items={this.props.items}
                            openSellModal={this.open}
                        />
                    </Table>
                    <h3>{'Efectivo Actual: $' + this.props.currentCashBalance}</h3>
                </Col>
                <CustomModal currentCashBalance = {this.props.currentCashBalance} transaction = 'Venta'
                item = {this.state.item || ''} currentPrice = {this.state.currentPrice || ''} showModal = {this.state.showModal} onClose = {this.close} 
                executeTransaction = {this.executeTransaction} operation = {this.sellOperation} 
                isValid = {this.isValidSell}/>
            </Row>
        )
    }
});

export default PortfolioTable;
const mapStateToProps = function (state) {
    //console.log('aqui')
    return {
        currentCashBalance: state.get('currentCashBalance'),
        
        items: state.get('items'),
        headers: state.get('headers'),
        title: state.get('title')
    }
}
const mapDispatchToProps = function (dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch),
        navigateToHome: function () {
            return browserHistory.push('/portfolio')
        }
    };
};

export const PortfolioContainer = connect(null, mapDispatchToProps)(PortfolioTable);