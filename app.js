var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');

const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var app = express();
app.use(express.static('public'))

app.use(cookieParser()); // Add this after you initialize express.

//Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');
// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/contact.js')(app);
app.use('/', indexRouter);

module.exports = app;