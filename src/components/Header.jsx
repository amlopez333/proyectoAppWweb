import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import headerChange from '../actions/action_creators'


const Header = React.createClass({
    mixins: [PureRenderMixin],


    render: function () {
        return (
            <div className = "Header" >
                <div className = "col-lg-12">
                    <h1 className ="page-header">
                        {this.props.title} <small>{this.props.description}</small>
                    </h1>
                    <ol className ="breadcrumb">
                        <li className ="active">
                            <i className={this.props.iconName}></i> {this.props.title}
                        </li>
                    </ol>
                </div>
            </div >
        );
    }
});

export default Header;

const mapStateToProps = function (state) {
    return {
        title: state.title,
        description: state.description,
        iconName: state.icon
    };
}.bind(this);

export const HeaderContainer = connect(mapStateToProps, headerChange)(Header);