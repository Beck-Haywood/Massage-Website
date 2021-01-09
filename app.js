// var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
// var contactRouter = require('./routes/contact');
// const expressValidator = require('express-validator');

var app = express();
app.use(express.static('public'))

app.use(cookieParser()); // Add this after you initialize express.

//Handlebars
// app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');
// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(expressValidator());


// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
require('./routes/contact.js')(app);
app.use('/', indexRouter);
// app.use('/send', contactRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
