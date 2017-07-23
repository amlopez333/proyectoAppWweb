import React, { Component } from 'react';
import { Grid, Form, FormGroup, Col, Button, ControlLabel, FormControl} from 'react-bootstrap/lib';
import ReactDOM from 'react-dom';
const assign = Object.assign //|| import Object.assign from 'object-assign';
import { browserHistory } from 'react-router';
import axios from 'axios';
import LoadingIcon from './LoadingIcon';
const LoginForm = React.createClass( {
  getInitialState: function(){
    return {email: '',
            password: ''
            }
  },
  onChangeUsername: function (evt) {/** Updates de campos */
    return this.setState({ email: evt.target.value });
  },
  onChangePassword: function (evt) {/** Updates de campos */
    return this.setState({ password: evt.target.value });
  },
  render: function() {
    return(
      <Grid>
        <Form horizontal>  
          <Col md={6}>
            <FormGroup controlId='formHorizontalEmail'>        
                <FormControl className="LoginRegisterForm" type="email" value={this.state.email}
                placeholder="someemail@example.com" onChange={this.onChangeUsername} 
                autoCorrect="off" autoCapitalize="off" spellCheck="false" ref = 'email'/>
            </FormGroup>
            <FormGroup controlId='formHorizontalEmail'>        
                <FormControl className="LoginRegisterForm"  type="password" value={this.state.password} placeholder="••••••••••"  
                onChange={this.onChangePassword} ref = 'password'/>
            </FormGroup>
            <FormGroup className="LoginRegisterForm">
              {this.props.isLoading ? <LoadingIcon /> : <Button  className="LoginRegisterButton" bsStyle='primary' block onClick={this.login}>
                  Iniciar Sesión
              </Button>}
            </FormGroup>
          </Col>
          {/*this.props.currentlySending ? (
            <LoadingButton />
          ) : (
            <button className="form__submit-btn" type="submit">{this.props.btnText}</button>
          )*/}
        </Form>
      </Grid>
    );
  },

  login: function(evt) {
    evt.preventDefault();
    const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    if(!email || !password){
      return;
    }
    axios.post('http://127.0.0.1:3000/login/', {email: email, password: password}).then(function(response){
          //browserHistory.push('/portfolio');
          console.log(response);
          return this.props.login(response.data.userId);
    }.bind(this)).catch(function(error){
      //algo más elegante
      return alert(error);
    }.bind(this))
      //algo mas elegante
    return this.props.load();
  }

})

export default LoginForm;