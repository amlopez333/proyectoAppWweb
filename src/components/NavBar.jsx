import React from 'react';
import { Row, Col, Nav, Navbar } from 'react-bootstrap/lib';
import { NavbarHeader, NavbarBrand, NavbarCollapse, NavItem, NavbarToggle } from 'react-bootstrap/lib';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
//import createBrowserHistory from 'history/createBrowserHistory';
//const browserHistory = createBrowserHistory();
import * as actions from '../actions/action_creators';
//import headerChange from '../action_creators';

const NavBar = React.createClass({
    /**
     * Cambiar el texto de los headers de cada página
     */
    portfolioHeader: function (evt) {
        evt.preventDefault();
        this.props.actions.headerChange('Portafolio', 'Desempeño', 'glyphicon glyphicon-book');
        browserHistory.push('/portfolio');
    },
    searchHeader: function (evt) {
        evt.preventDefault();
        //this.props.actions.headerChange('Búsqueda', 'Comprar Acciones', 'glyphicon glyphicon-plus-sign');
        browserHistory.push('/search');
    },
    faqHeader: function(evt){
        evt.preventDefault();
        //this.props.actions.headerChange('Búsqueda', 'Comprar Acciones', 'glyphicon glyphicon-plus-sign');
        browserHistory.push('/faq');
    },
    /** ------------------------------------------------ */
    render: function () {
        return (
            <Navbar inverse collapseOnSelect  className="navbar-fixed-top NavBar" role="navigation">

                <Navbar.Header>
                    <div className="brandtitle">
                        {/*<Link > </Link>*/}
                        <nobr><h1 className="scaps nobr MainTitle">Daquant</h1></nobr><nobr><h3 className="SubTitle"> - Trader - </h3></nobr>
                    </div>
                    <Navbar.Toggle className="navbar-toggle navbar-brand Toggle" data-toggle="collapse" data-target="navbar-ex1-collapse" />
                </Navbar.Header>
                {/*<!-- Top bar Menu Items -->*/}
                <ul className="nav navbar-right top-nav">
                    {/* sección izquierda del navbar*/}
                    <li className="dropdown">
                    </li>
                </ul>

                {/*<!-- 
                    Sidebar Menu Items 
                        These collapse to the responsive navigation menu on small screens 
                -->*/}
                <Navbar.Collapse className='collapse navbar-ex1-collapse'>

                    <ul className='nav navbar-nav side-nav'>

                        <li className="MenuOption">< Link to='portafolio' onClick={this.portfolioHeader} >
                            <i className="glyphicon glyphicon-book"></i>&nbsp; 
                            Portafolio</Link>
                        </li>

                        <li className="MenuOption"><Link to='search' onClick={this.searchHeader}>
                            <i className="glyphicon glyphicon-plus-sign"></i>&nbsp;
                            Compra</Link>
                        </li>

                        <li className="MenuOption">
                            <a className='faq'>
                            <i className="glyphicon glyphicon-info-sign"></i>&nbsp;
                            Preguntas Frecuentes</a>
                        </li>
                    </ul>

                </Navbar.Collapse>
            </Navbar>
        );
    }
});

export default NavBar;
const mapDispatchToProps = function (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export const NavBarContainer = connect(null, mapDispatchToProps)(NavBar);