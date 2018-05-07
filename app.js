var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var session = require('express-session');
var passport = require('passport');
var flash =require('connect-flash');
require('./app_server/models/db');

//creo "routers"
var mainRouter = require('./app_server/routes/main');
var indexRouter = require('./app_server/routes/index');
var torneoRouter = require('./app_server/routes/torneo');
var contactRouter = require('./app_server/routes/contact');
var usersRouter = require('./app_server/routes/users');
var signupRouter = require('./app_server/routes/signup');

var app = express();
require('./app_server/config/passport');

// view engine setup
//app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/app_server/views'}));
app.set('views', path.join(__dirname, 'app_server' ,'views'));
app.set('view engine', 'hbs');

//HBS helpers
hbs.registerHelper('inc',function(value,options){
	return parseInt(value) + 1;	
});
hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'keysession', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.use('/index', indexRouter); 
app.use('/torneo', torneoRouter);
app.use('/contact', contactRouter);
app.use('/user/signup', signupRouter);
app.use('/users', usersRouter);
app.use('/', mainRouter);


/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/


module.exports = app;
