import axios from 'axios'

function fetchStocks(func="TIME_SERIES_DAILY", stock, interval){
    let encodedURI;
    if(interval){
        encodedURI = window.encodeURI('https://www.alphavantage.co/query?function='+func+'&symbol='+stock+'&interval='+interval+'&apikey=K7S08RRI532JTVS3');
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
                return response.data['Intraday Time Series (' + interval + ')']
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

export default {fetchStocks};
