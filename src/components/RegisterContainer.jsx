import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegisterForm from './Register';
//import auth from '../../utils/auth';
import { register } from '../actions/action_creators';
//import LoadingIndicator from '../LoadingIndicator.react';

const Register = React.createClass( {
	render: function() {
		
        return (
            <div>
                <h2 className="FormTitle">Registro</h2>
                    <br />
                    {/* While the form is sending, show the loading indicator,
                        otherwise show "Log in" on the submit button */}
                <RegisterForm location={location} history={this.props.history} 
                register = {this.props.actions} />
            </div>
        );
    },

	login: function(username, password) {
		this.props.dispatch(login(username, password));
	}
});

export default Register;
// Which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    data: state.get('data')
  };
}
const mapDispatchToProps = function(dispatch){
    return {
        actions: bindActionCreators(register, dispatch)
    }
}

// Wrap the component to inject dispatch and state into it
export const RegisterContainer =  connect(mapStateToProps, mapDispatchToProps)(Register);