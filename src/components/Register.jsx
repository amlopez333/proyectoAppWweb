import React, { Component } from 'react';
import { Grid, Form, FormGroup, Col, Button, ControlLabel, FormControl} from 'react-bootstrap/lib';
import ReactDOM from 'react-dom';
import axios from 'axios'
const RegisterForm = React.createClass( {
  getInitialState: function(){
    return {name: '',
            lastName: '',
            ssn: '',
            email: '',
            password: '',
            }
  },
  onChangeName: function (evt) {/** Updates de campos */
    return this.setState({ name: evt.target.value });
  },
  onChangeLastName: function (evt) {/** Updates de campos */
    return this.setState({ lastName: evt.target.value });
  },
  onChangeSSN: function (evt) {/** Updates de campos */
    return this.setState({ ssn: evt.target.value });
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
                <FormControl className="LoginRegisterForm" type="text" value={this.props.state} 
                placeholder="Nombre" onChange={this.onChangeName} 
                autoCorrect="off" autoCapitalize="off" spellCheck="false" ref = 'name'/>
            </FormGroup>
            <FormGroup controlId='formHorizontalEmail'>        
                <FormControl className="LoginRegisterForm" type="text" value={this.props.state} 
                placeholder="Apellido" onChange={this.onChangeLastName} 
                autoCorrect="off" autoCapitalize="off" spellCheck="false" ref = 'lastName'/>
            </FormGroup>
            <FormGroup controlId='formHorizontalEmail'>        
                <FormControl className="LoginRegisterForm" type="text" value={this.props.state} 
                placeholder="Cédula" onChange={this.onChangeSSN} 
                autoCorrect="off" autoCapitalize="off" spellCheck="false" ref = 'ssn'/>
            </FormGroup>
            <FormGroup controlId='formHorizontalEmail'>        
                <FormControl className="LoginRegisterForm" type="text" value={this.props.state} 
                placeholder="Correo electrónico" onChange={this.onChangeEmail} 
                autoCorrect="off" autoCapitalize="off" spellCheck="false" ref = 'email'/>
            </FormGroup>
            <FormGroup controlId='formHorizontalEmail'>        
                <FormControl className="LoginRegisterForm" type="password" value={this.props.state} 
                placeholder="Constraseña"  onChange={this.onChangePassword} ref = 'password'/>
            </FormGroup>
            <FormGroup>
              <Button className="LoginRegisterButton" bsStyle='primary' block onClick={this.register}>
                  Registrarme
              </Button>
            </FormGroup>
          </Col>
          
        </Form>
      </Grid>
    );
  },
  register: function(evt) {
    evt.preventDefault();
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const lastName = ReactDOM.findDOMNode(this.refs.lastName).value.trim();
    const ssn = ReactDOM.findDOMNode(this.refs.ssn).value.trim();
    const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    if(!name || !lastName || ! ssn || !email || !password){
      return;
    }
    axios.post('/register/', {name: name, lastName: lastName, 
      ssn: ssn, email: email, password: password}).then(function(response){
          //console.log(response);
          //algo mas elegante.
          alert('Registro Exitoso!')
          return this.props.register();
    }.bind(this)).catch(function(error){
      //algo más elegante
      return alert(error);
    }.bind(this))
      //algo mas elegante
    return alert('Registrando...');
    //return browserHistory.push('/');
    
    this.props.onSubmit(this.props.data.username, this.props.data.password);
  }

})

export default RegisterForm;