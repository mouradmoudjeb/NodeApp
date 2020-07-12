const express = require('express');
const morgan = require('morgan'); 
const mongoose = require('mongoose');
const BlogRoutes = require('./routes/blogRoutes')


var app = express();

/// connect to mongoDB
const dbURI = 'mongodb+srv://dbUser:password1234@nodedemo.t0ztj.mongodb.net/mydb?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser : true, useUnifiedTopology : true})
    .then((result) => { 
        console.log('Connected to database')
        //// start listening 
        app.listen(5000)
    })
    .catch((err) => console.log('Mongo connection problem : ',err))

//// set the view engine
app.set('view engine', 'ejs');
/// middleware & static 
app.use(express.static('./public'));
/// this middleware is for geting the data from a post url
app.use(express.urlencoded({ extended : true }));

/// logger 
app.use(morgan('tiny'));

//// routes
app.get('/', (req, res) => {
    res.render('index', {profile : 'Mourad', title : 'Home', lead : 'Welcome home', desc : 'This is out home page'});
    ///// render and pass data to the view engine 
});

app.get('/about', (req, res) => {
    res.render('about', {profile : 'Mourad', title : 'About', lead : 'This is out about us', desc : 'We are learning node js'});
});

///////// blog routes

app.use('/blogs',BlogRoutes)

///// 404 page
app.use((req, res)=>{
    res.status(404).render('404', {profile : 'Mourad'});
});