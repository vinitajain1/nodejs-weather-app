const path = require('path');
const express = require("express");
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set("views", viewsPath);
hbs.registerPartials(partialPath);


//Setup static directory to serve
app.use(express.static(publicDirPath));



app.get('',(req,res)=>{
    res.render('index', {
        title: "Weather App",
        name: "Vinita Jain"
    })
});

app.get('/about',(req,res)=>{
    res.render('about',  {
        title: "About",
        name: "Vinita Jain"
    })
});

app.get('/help',(req,res)=>{
    res.render('help',  {
        title: "Help",
        name: "Vinita Jain",
        helpMessage: "This is some helpful message",
    })
});

app.get("/weather", (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Address query is required"
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,weatherForecast)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                    location:req.query.address,
                    forecast:weatherForecast
            })
        });
    });
});

app.get('/help/*',(req,res)=>{
    res.render('pageNotFound', {
        title: "404",
        message:"Help page not found!",
        name:"Vinita Jain"
    });
})

app.get('*',(req,res)=>{
     res.render('pageNotFound', {
        title: "404",
        message:"Page not found!",
        name:"Vinita Jain"
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000');
});