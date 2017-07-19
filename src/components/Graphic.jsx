import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchingFromApi} from './actions/searchActions'
import LineChart from 'react-linechart'


class Graphic extends Component{  
    render(){                           
        //console.log(temp)
        //console.log(this.props.result.splice(0,20))
        var temp = Object.values(this.props.result);
        var arr = [];
        for (var e in temp){
            arr.push(parseFloat(temp[e]['4. close']));
        }
        var spliced = arr.splice(0,20)
        spliced.reverse();
        var po = [];
        var num = 0;
        for(var f in spliced){
            po.push({x:num,y:spliced[f]});
            num++;
        }
        // //console.log(po)
        const data = [{
            color:"steelblue",
            points: po
        }]
        return (
            <div>
                <h1>{this.props.stock.toUpperCase()}</h1>                
                <LineChart 
                    width={900}
                    height={400}
                    yLabel="USD"
                    hideXLabel
                    data={data}
                />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        result: state.search.result,
        stock: state.search.stock
    }
}

export default connect(mapStateToProps, fetchingFromApi)(Graphic)