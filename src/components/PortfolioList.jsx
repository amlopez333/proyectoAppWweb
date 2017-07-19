import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PortfolioItem from './PortfolioItem'

const PortfolioList = React.createClass({
    mixins: [PureRenderMixin],
    getItems: function () {
        return this.props.items || []
    },
    render: function () {
        return (
            <tbody>
                {this.getItems().map(function (item, key) {
                    {/*console.log(item)*/}
                    return (
                        <PortfolioItem key={key}
                            item = {item}
                            openSellModal = {this.props.openSellModal}
                            data-toggle = "collapse" data-target = {item.get('_id')}
                        />
                    );
                }.bind(this))}
            </tbody>
        )
    }
});
export default PortfolioList;