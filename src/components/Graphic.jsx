import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchingFromApi} from '../actions/action_creators';
import LineChart from 'react-linechart';
import {parseFlatArray} from 'react-linechart';
import d3 from 'd3';
console.log(parseFlatArray);

class Graphic extends Component{
    xParser(){
        //console.log('fetch', isDate)
        isDate ? d3.time.format("%Y-%m-%d").parse : ((x) => x)
    }
    render(){                           
        //console.log(temp)
        //console.log(this.props.result.splice(0,20))
        let data = [
                
        ]
        
        if(this.props.result){
            //console.log('chunga', this.props.result.get("2017-07-21 15:19:00"));
            //console.log(Object.keys(this.props.result.toJS()).sort());
            
            let temp = Object.values(this.props.result.toJS());
            //console.log(temp)
            let temp2 = []
            Object.keys(this.props.result.toJS()).sort().forEach(function(value){
                console.log(this.props.result.get(value).get('4. close'))
                temp2 = temp2.concat([parseFloat(this.props.result.get(value).get('4. close'))])
            }.bind(this))
            //console.log('temp2: ', temp2);
            var arr = [];
            for (var e in temp){
                arr.push(parseFloat(temp[e]['4. close']));
            }
            //var spliced = temp2.splice(0,20)
            //spliced.reverse();
            var po = Object.keys(this.props.result.toJS()).sort().map(function(element, i){
                return {date: i, price: temp2[i]}
            });
            po = parseFlatArray(po, 'date', 'price')
            /*var num = 0;
            for(var f in temp2){
                po.push({x:num,y:temp2[f]});
                num++;
            }*/
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
                    data={po}
                    margins = { {top: 50, right: 20, bottom: 50, left: 100} }
                />
            </div>
        );
    }
}



export default Graphic