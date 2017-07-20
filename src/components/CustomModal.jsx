import React from 'react';
import { Row, Col, Modal, Grid, Form, FormGroup, Button, ButtonGroup, ControlLabel, FormControl, Popover, Tooltip, OverlayTrigger} from 'react-bootstrap/lib';
import {round10} from '../utils/math'
const CustomModal = React.createClass({
    getInitialState: function() {
        return { cantidad: 0 };
    },

    closeModal: function() {
        this.setState({cantidad: 0});
        return this.props.onClose();
    },
    executeTransaction: function(){
        //this.props.onClose();
        return this.props.executeTransaction(this.state.cantidad);
    },
    onChangeCantidad: function(evt){
        return this.setState({cantidad: evt.target.value});
    },
    render: function() {
        const popover = (
        <Popover id="modal-popover" title="popover">
            {this.props.modalMessage}
        </Popover>
        );
        const tooltip = (
        <Tooltip id="modal-tooltip">
            {this.props.modalMessage}
        </Tooltip>
        );
        let ticker = '';
        let price = ''//this.props.item.get('price');
        const currentCashBalance = this.props.currentCashBalance;
        const transaction = this.props.transaction
        if(this.props.item && this.props.currentPrice){
            ticker = this.props.item.get('ticker');
            price = this.props.currentPrice;
        }
    return (
      <div>
        <Modal animation show={this.props.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton onHide={this.closeModal}>
            <Modal.Title>{ transaction + ' ' + ticker} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Recuerde que hay una comisión de $6.75 por transacción.</h4>
            <hr />
            <dl>
                <dt>Precio</dt>
                <dd>{price}</dd>
                <dt>Cantidad</dt>
                <dd><input type = 'number' required ref = 'cantidad' onChange = {this.onChangeCantidad} value = {this.state.cantidad}/>
                    {/*<OverlayTrigger overlay={popover}>atun</OverlayTrigger>*/}
                </dd>
                <dt>Total</dt>
                <dd>{this.state.cantidad > 0 ? round10(this.state.cantidad * price - 6.75) : 0}</dd>
                <dt>Efectivo actual</dt>
                <dd>{currentCashBalance}</dd>
                <dt>Efectivo restante</dt>
                <dd className = {this.props.isValid(this.state.cantidad) ? 'valid': 'invalid'}>
                    {this.props.operation(currentCashBalance, this.state.cantidad, price)}
                </dd>
            </dl>
            <hr />
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup bsSize="small" >
                <Button onClick={this.executeTransaction} 
                className = {this.props.isValid(this.state.cantidad) ? 'valid': 'invalid'}>
                    {transaction}
                </Button>
                <Button onClick={this.closeModal}>Cancelar</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

export default CustomModal;
