import React from 'react';
import { Grid } from 'react-bootstrap';
import PortfolioContainer from './PortfolioTable';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/action_creators';
//import AlertContainer from 'react-alert';

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
    render: function () {
        return (
            <section className='portfolio'>
                {/*<AlertContainer ref={(b) => global.msg = b} {...this.alertOptions} />*/}
                <Grid>
                    <PortfolioContainer {...this.props} />
                </Grid>
            </section>

        );
    }
});

export default Home;

var mapStateToProps = function (state) {
    if (state.get('dbError')) {
        /*msg.error('No se ha podido conectar con la base de datos', {
        })*/;
    }
    return {
        currentCashBalance: state.get('currentCashBalance'),
        items: state.get('items'),
        headers: state.get('headers'),
        title: state.get('title')
    };
};

export const HomeContainer = connect(mapStateToProps, actionCreators)(Home);