import axios from 'axios'

export const fetchStocks = function(func="TIME_SERIES_DAILY", stock){
    let encodedURI;
    console.log(func === "TIME_SERIES_INTRADAY");
    if(func === "TIME_SERIES_INTRADAY"){
        console.log('chunga');
        encodedURI = window.encodeURI('https://www.alphavantage.co/query?function='+func+'&symbol='+stock+'&interval=1min&apikey=K7S08RRI532JTVS3');
    }
    else{
        encodedURI = window.encodeURI('https://www.alphavantage.co/query?function='+func+'&symbol='+stock+'&apikey=K7S08RRI532JTVS3');
    } 
    return axios.get(encodedURI)
    .then( (response)=>{
        //console.log('fetch')
        //console.log(response.data['Time Series (Daily)'])
        switch(func){
            case "TIME_SERIES_INTRADAY":
                return response.data['Time Series (1min)']
            case "TIME_SERIES_DAILY":
                return response.data['Time Series (Daily)'];
            case "TIME_SERIES_WEEKLY":
                return response.data['Weekly Time Series'];
            case "TIME_SERIES_MONTHLY":
                return response.data['Monthly Time Series'];
            default:
                return response.data['Time Series (Daily)'];
        }
        //return response.data['Time Series (Daily)'];
    })
}

//export default fetchStocks;
