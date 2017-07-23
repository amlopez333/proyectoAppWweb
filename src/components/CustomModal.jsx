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
        if(this.props.transaction === 'Venta'){
            return this.props.executeTransaction(this.state.cantidad);
        }
        let keys = Object.keys(this.props.item.toJS()).sort()
        let price = round10(this.props.item.get(keys[keys.length -1]).get('4. close'));
        return this.props.executeTransaction(this.state.cantidad, price)
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
        if(this.props.item && this.props.currentPrice && this.props.transaction === 'Venta'){
            ticker = this.props.item.get('ticker');
            price = this.props.currentPrice;
        }
        if(this.props.item && this.props.transaction === 'Compra'){
            ticker = this.props.ticker
            let keys = Object.keys(this.props.item.toJS()).sort()
            price = round10(this.props.item.get(keys[keys.length -1]).get('4. close'));
        }
        const comission = this.props.transaction === 'Venta' ? -6.75 : 6.75
    return (
      <div>
        <Modal animation autoFocus = {false} show={this.props.showModal} onHide={this.closeModal} keyboard = {true}>
          <Modal.Header className="ModalHeader" closeButton onHide={this.closeModal}>
            <Modal.Title className="ModalTitle">{ transaction + ' ' + ticker.toUpperCase()} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 className="ModalReminder">Recuerde que hay una comisión de $6.75 por transacción.</h4>
            <hr />
            <dl className="Transaction">
                <dt>Precio</dt>
                <dd className="TransactionValue">{price}</dd>
                <dt>Cantidad</dt>
                <dd className="TransactionValue"><input type = 'number' required ref = 'cantidad' onChange = {this.onChangeCantidad} value = {this.state.cantidad}/>
                    {/*<OverlayTrigger overlay={popover}>atun</OverlayTrigger>*/}
                </dd>
                <dt>Total</dt>
                <dd className="TransactionValue">{this.state.cantidad > 0 ? round10(this.state.cantidad * price + comission) : 0}</dd>
                <dt>Efectivo actual</dt>
                <dd className="TransactionValue">{currentCashBalance}</dd>
                <dt>Efectivo restante</dt>
                <dd className = {this.props.isValid(this.state.cantidad) ? 'valid': 'invalid'}>
                    {this.props.operation(currentCashBalance, this.state.cantidad, price)}
                </dd>
            </dl>
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup bsSize="small" >
                <Button style={{backgroundColor:"#1c6000", color:"white", margin:"4px", paddingLeft:"30px", paddingRight:"30px", fontWeight:"bold"}} onClick={this.executeTransaction} 
                disabled = {this.props.isValid(this.state.cantidad) ? false: true}>
                    {transaction}
                </Button>
                <Button style={{backgroundColor:"#1c6000", color:"white", margin:"4px", paddingLeft:"30px", paddingRight:"30px", fontWeight:"bold"}} onClick={this.closeModal}>Cancelar</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

export default CustomModal;
