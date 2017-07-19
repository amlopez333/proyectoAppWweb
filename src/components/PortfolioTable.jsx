import React from 'react';
import {Row, Table, Grid,  Col, Button} from 'react-bootstrap/lib';
import PortfolioHeader from './PortfolioHeader';
import PortfolioList from './PortfolioList';
//import SearchBar from './SearchBar';
import CustomModal from './CustomModal'
import { connect } from 'react-redux';
const PortfolioTable = React.createClass({
    getInitialState: function () { 
        return {
            showModal: false
        };
    },
    open: function (item) {
        this.setState({ item: item });
        this.setState({ showModal: true });
        //console.log(this.state.item)
    },
    close: function () {
        return this.setState({ showModal: false });
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
                </Col>
                <CustomModal currentCashBalance = {this.props.currentCashBalance} transaction = 'Venta'
                item = {this.state.item || ''} showModal = {this.state.showModal} onClose = {this.close}/>
            </Row>
        )
    }
});

export default PortfolioTable;
const mapStateToProps = function (state) {
    return {

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

export const PortfolioContainer = connect(mapStateToProps, mapDispatchToProps)(PortfolioTable);