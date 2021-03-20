const request = require('request');


const forecast = (latitude,longitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=fb97f07c59b27113c29602ca31cc2416&query=${latitude},${longitude}&units=f`;
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services',undefined);
        }
        else if(response.body.error){
            callback('Unable to find location.Try another search',undefined);
        }else{
            callback(undefined,response.body.current.weather_descriptions[0]);
        }
        
    });
}

module.exports = forecast;