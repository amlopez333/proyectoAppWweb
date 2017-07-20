import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchingFromApi} from '../actions/action_creators'
import LineChart from 'react-linechart'


class Graphic extends Component{
    constructor(props) {
    super(props);
    //this.state = {count: props.initialCount};
  }  
    render(){                           
        //console.log(temp)
        //console.log(this.props.result.splice(0,20))
        let data = [
                
        ]
        console.log(this.props.result);
        if(this.props.result){
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
            data = [{
                color:"steelblue",
                points: po
        }]}
        let stock = this.props.stock
        if(stock){
            stock = stock.toUpperCase();
        }
        return (
            <div>
                <h1>{stock || ''}</h1>                
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
        result: state.result,
        stock: state.stock
    }
}

export default connect(mapStateToProps, fetchingFromApi)(Graphic)