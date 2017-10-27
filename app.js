//bread and butter
const express = require('express');
const app = express();
const db = require('./db').db;
// const nunjucks = require('nunjucks');

//additional resources
const path = require('path');

//app configuration
// app.engine('html', nunjucks.render); // how to render html templates
// app.set('view engine', 'html'); // what file extension do our templates have
// nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

//middleware
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, '/public'))); //static-middleware

//route forwarding
const mainRouter = require('./routes');
app.use('/', mainRouter);



//error handling - IT MUST HAVE FOUR PARAMS
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || "Internal Error");
});


// db.sync({force: true})
// .then(db => {
//     app.listen(3000);
// })
//start up. 
async function startUp(){
    try {
        await db.sync(/*{force: true}*/);
        await app.listen(3000);
        console.log('app running on port 3000'); 
    } catch(err){
        console.error(err, ' on startup.')
    }
}

startUp();
