require('./src/models/db');

const express = require('express');
const path = require('path');
const exphbs= require('express-handlebars');
const bodyparser= require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const usercontroller= require('./src/routes/user.route');

var app=express();
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());

// app.use(function(req, res) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
// })

app.set('views',path.join(__dirname,'/views/'))
app.engine('hbs',exphbs.engine({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname+'/views/layouts/'}));
app.set('view engine','hbs');

app.listen(3000,()=>{
    console.log('Express server started at port:3000');
});
app.use('/',usercontroller);

