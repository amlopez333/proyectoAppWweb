import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
const PortfolioHeader = React.createClass({
    mixins: [PureRenderMixin],
    getHeaders: function(){
        return this.props.headers || [];
    },
    render: function(){
        return(
            <thead>
                <tr className = 'table-header'>
                    {this.getHeaders().map(function(header, i){
                        //console.log(header, i)
                        return(
                            <th className="TableHeader" key = {i}>{header}</th>
                        );
                    }.bind(this))}
                </tr>
            </thead>
        );
    }
});

export default PortfolioHeader;