import axios from 'axios'

function fetchStocks(func="TIME_SERIES_DAILY",stock){
    var encodedURI = window.encodeURI('https://www.alphavantage.co/query?function='+func+'&symbol='+stock+'&apikey=K7S08RRI532JTVS3');
    return axios.get(encodedURI)
    .then( (response)=>{
        //console.log('fetch')
        //console.log(response.data['Time Series (Daily)'])
        switch(func){
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
