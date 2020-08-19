const request = require('request');

const forecast = (latitude, longitude, callback) =>{

    //Here is not neccesary to parse latitude and longitude to a string in order to add them to the url
    const url = "http://api.weatherstack.com/current?access_key=c0b946cc099f448e6a38531f6d12c9e9&query=" + latitude + "," + longitude;

    request({ url: url, json: true }, (error, {body} ) => {  //You can use (error, response) as well, but I am using destructuring in order to have a clean code

        //As we defined above "json: true", the response will come in a JS object. So we can manipulate in a better way
        //console.log(response.body.current);
        //You need to know, that will only have one of [error, response]. Only one of these 2 exists.
    
        if (error) {
            callback("Unable to connect to weather service!", undefined); //This statement is when you don't have internet, or when you don't have answer of the API
            
        } else if (body.error) {
            callback("Unable to find the location", undefined);  //This statement is when the answer of the API contains an error(but you have an answer)
        } else {
            callback(undefined, {
                weatherDescription: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                rain_probability: body.current.precip
            });
    
        }    
    
    })

};

module.exports = forecast; //That is the way to export a file