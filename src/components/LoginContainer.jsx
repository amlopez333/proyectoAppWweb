import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from './Login';
//import auth from '../../utils/auth';
import { login } from '../actions/action_creators';
//import LoadingIndicator from '../LoadingIndicator.react';

const Login = React.createClass( {
	render: function() {
		
        return (
            <div>
                <h2 className="FormTitle">Inicio de Sesión</h2>
                <br />
                    
                    {/* While the form is sending, show the loading indicator,
                        otherwise show "Log in" on the submit button */}
                <LoginForm  
                login={this.props.actions}  />
            </div>
        );
    },

	login: function(username, password) {
		this.props.dispatch(login(username, password));
	}
});

export default Login;
// Which props do we want to inject, given the global state?

const mapDispatchToProps = function(dispatch){
    return {
        actions: bindActionCreators(login, dispatch)
    }
}
// Wrap the component to inject dispatch and state into it
export const LoginContainer =  connect(null, mapDispatchToProps)(Login);