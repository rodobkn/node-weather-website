const express = require('express');  //Here we are importing express
const path = require('path');  
const app = express();  //Here we are storing in a constant all the express functionality
const hbs = require('hbs')  //We are importing hbs in order to be able to set up partials
const geocode = require('./utils/geocode');  
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000  //Here we are setting up the port. If we are on heroku will use the first one. if the first one doesn't exists, JS will choose the second one, and that will be the case of run locally the program

//"__dirname" brings to us the exact absolute path for the directory where we are(in this case src). And then you can join with the specific place that you want to go
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Here we set up hbs third pachake into express.
app.set('view engine', 'hbs')
//Here we set up a new directory to store the hbs files. Because then we can only use the name of the hbs file, and not the whole path. By default the directory is called "views"
app.set('views', viewsPath)
//Here we are saying where we are going to store our partials files.
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectoryPath)); 

//When you put '' as first argument, by default is the root page. 
app.get('', (req, res) => {

    //Here we need to put in the first argument only the name of the dynamic hbs file(storing in the views directory).
    //In the second argument, we provide the dynamic things that we want to render. The best way to pass data is through an object
    res.render('index', {
        title: 'Weather',
        name: 'Rodolfo Mendoza'
    });  
});

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About Me',
        name: 'Rodolfo Mendoza'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        message: 'Do you want to help you?',
        title: 'Help',
        name: 'Rodolfo Mendoza'
    })
})

//It is important to remember that you can use only ONE TIME res.send(). HTTP protocol doesn't permit to send 2 times information
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    error
                });
            }
            
            res.send({
                location,
                description: forecastData.weatherDescription,
                temperature: forecastData.temperature,
                rainProbability: forecastData.rain_probability
            });

        })

    })

});


app.get('/products', (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    })

})

//With '/help/*' we can provide an error page when someone type a url as '/help/chat'
app.get('/help/*', (req, res) => {

    res.render('404', {
        errorMessage: 'Help article not found',
        title: 'Error page 404',
        name: 'Rodolfo Mendoza'
    })

})

//  We need to put this sentence at the final of all routes, because '*' means every another route. That is usefull when someone type an incorrect url in our web
app.get('*', (req, res) => {

    res.render('404', {
        errorMessage: 'Page not found',
        title: 'Error page 404',
        name: 'Rodolfo Mendoza'
    })

})


//If we want to run our server, we need to add this line. In the first argument we provide the port where we want to have the project
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

