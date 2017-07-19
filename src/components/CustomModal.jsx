import React from 'react';
import { Row, Col, Modal, Grid, Form, FormGroup, Button, ButtonGroup, ControlLabel, FormControl, Popover, Tooltip, OverlayTrigger} from 'react-bootstrap/lib';
const CustomModal = React.createClass({
    getInitialState: function() {
        return { cantidad: 0 };
    },

    closeModal: function() {
        return this.props.onClose();
    },
    executeTransaction: function(){
        return this.props.onClose();
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
        if(this.props.item){
            ticker = this.props.item.get('ticker');
            price = this.props.item.get('price');
        }
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.close}>
          <Modal.Header closeButton>
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
                <dt>Costo</dt>
                <dd>{this.state.cantidad * price * 6.75}</dd>
                <dt>Efectivo actual</dt>
                <dd>{currentCashBalance}</dd>
                <dt>Efectivo restante</dt>
                <dd className = {currentCashBalance - this.state.cantidad * price - 6.75 < 0 ? 'valid': 'invalid'}>
                    {currentCashBalance - this.state.cantidad * price - 6.75}
                </dd>
            </dl>
            <hr />
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup bsSize="small" >
                <Button onClick={this.executeTransaction} 
                className = {currentCashBalance - this.state.cantidad * price - 6.75 < 0 ? 'valid': 'invalid'}>
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
