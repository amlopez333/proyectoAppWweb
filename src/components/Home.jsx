import React from 'react';
import { Grid } from 'react-bootstrap';
import PortfolioContainer from './PortfolioTable';
import LoadingIcon from './LoadingIcon'
import { connect } from 'react-redux';
import * as actionCreators from '../actions/action_creators';
//import AlertContainer from 'react-alert';
import axios from 'axios';
const Home = React.createClass({
    getInitialState: function () {
        this.alertOptions = {
            offset: 400,
            position: 'top right',
            theme: 'dark',
            time: 500000,
            transition: 'scale'
        };
        return null;
    },
    getPortfolio: function(){
        if(this.props.userId && !this.props.currentCashBalance){
            axios.get('/portfolios/' + this.props.userId).then(function(response){
                let currentCashBalance = response.data.data.currentCashBalance;
                let items = response.data.data.portfolio
                return this.props.getPortfolio(currentCashBalance, items)
            }.bind(this)).catch(function(error){
                return console.log(error);
            })
            return this.props.load();
        }
    },
    render: function () {
        this.getPortfolio();
        return (
            <section className='portfolio'>
                {/*<AlertContainer ref={(b) => global.msg = b} {...this.alertOptions} />*/}
                <Grid>
                    <h2 className="FormTitle">Portafolio</h2>
                    {this.props.isLoading ? <LoadingIcon /> : <PortfolioContainer {...this.props} />}
                </Grid>
            </section>

        );
    }
});

export default Home;

var mapStateToProps = function (state) {
    if (state.dbError) {
        /*msg.error('No se ha podido conectar con la base de datos', {
        })*/;
    }
    //console.log('aqui')
    return {
        userId: state.get('userId'),
        currentCashBalance: state.get('currentCashBalance'),
        isLoading: state.get('isLoading'),
        items: state.get('items'),
        headers: state.get('headers'),
        title: state.get('title')
    };
};

export const HomeContainer = connect(mapStateToProps, actionCreators)(Home);