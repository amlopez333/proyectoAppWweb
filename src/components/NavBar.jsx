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
    loginHeader: function(evt){
        evt.preventDefault();
        //this.props.actions.headerChange('Búsqueda', 'Comprar Acciones', 'glyphicon glyphicon-plus-sign');
        browserHistory.push('/');
    },
    registerHeader: function(evt){
        evt.preventDefault();
        //this.props.actions.headerChange('Búsqueda', 'Comprar Acciones', 'glyphicon glyphicon-plus-sign');
        browserHistory.push('/register');
    },
    logoutHeader: function(evt){
        evt.preventDefault();
        browserHistory.push('/')
        return this.props.actions.logout();
    },
    /** ------------------------------------------------ */
    render: function () {
        const loggedNav =  (
            <div className = 'nav navbar-nav side-nav'>
                <li className="active">< Link to='portafolio' onClick={this.portfolioHeader} >
                    <i className="glyphicon glyphicon-book"></i>&nbsp; 
                    Portafolio</Link>
                </li>

                <li ><Link to='search' onClick={this.searchHeader}>
                    <i className="glyphicon glyphicon-plus-sign"></i>&nbsp;
                    Compra</Link>
                </li>

                <li ><Link to='faq' onClick={this.faqHeader}>
                    <i className="glyphicon glyphicon-plus-sign"></i>&nbsp;
                    Preguntas Frecuentes</Link>
                </li>
                <li ><Link to='/' onClick={this.logoutHeader}>
                    <i className="glyphicon glyphicon-plus-sign"></i>&nbsp;
                    Cerrar Sesión</Link>
                </li>
            </div >
        );
        const notLoggedNav =  (
            <div className = 'nav navbar-nav side-nav'>
                <li className="active">< Link to='/' onClick={this.loginHeader} >
                    <i className="glyphicon glyphicon-book"></i>&nbsp; 
                    Iniciar Sesión</Link>
                </li>

                <li ><Link to='register' onClick={this.registerHeader}>
                    <i className="glyphicon glyphicon-plus-sign"></i>&nbsp;
                    Registrarme</Link>
                </li>
            </div>
        );
        return (
            <Navbar inverse collapseOnSelect  className="navbar-fixed-top" role="navigation">

                <Navbar.Header>
                    
                    <Navbar.Toggle className="navbar-toggle navbar-brand" data-toggle="collapse" data-target="navbar-ex1-collapse" />
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
                        {this.props.userId ? loggedNav : notLoggedNav}
                        {/*<li className="active">< Link to='{portafolio}' onClick={this.portfolioHeader} >
                            <i className="glyphicon glyphicon-book"></i>&nbsp; 
                            Portafolio</Link>
                        </li>

                        <li ><Link to='search' onClick={this.searchHeader}>
                            <i className="glyphicon glyphicon-plus-sign"></i>&nbsp;
                            Compra</Link>
                        </li>

                        <li ><Link to='faq' onClick={this.searchHeader}>
                            <i className="glyphicon glyphicon-plus-sign"></i>&nbsp;
                            Compra</Link>
                        </li>*/}
                    </ul>

                </Navbar.Collapse>
            </Navbar>
        );
    }
});

export default NavBar;
const mapStateToProps = function (state) {
    return {
        userId: state.get('userId')
    };
};
const mapDispatchToProps = function (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);