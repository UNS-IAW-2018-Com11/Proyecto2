var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var hbs = require('hbs');
var passportSetup = require('./app_server/config/passportSetup');
var cookieSession = require('cookie-session');
var keys = require('./app_server/config/keys');
var passport = require('passport');

//creo "routers"
var indexRouter = require('./app_server/routes/index');
var torneoRouter = require('./app_server/routes/torneo');
var contactRouter = require('./app_server/routes/contact');
var usersRouter = require('./app_server/routes/users');
var authRouter = require('./app_server/routes/auth');
var adminRouter = require('./app_server/routes/admin');
var addTeamsRouter = require('./app_server/routes/add-teams');
var teamRouter = require('./app_server/routes/team');
var editorRouter = require('./app_server/routes/editor');

require('./app_server/models/db');

var app = express();

// view engine setup
//app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/app_server/views'}));
app.set('views', path.join(__dirname, 'app_server' ,'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieSession({
	maxAge:24*60*60*1000, //1 dia en milisegundos
	keys:[keys.session.cookieKey]
}));

//init passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', indexRouter);
app.use('/torneo', torneoRouter);
app.use('/contact', contactRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/add-teams', addTeamsRouter);
app.use('/team', teamRouter);
app.use('/editor', editorRouter);

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

hbs.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

module.exports = app;
