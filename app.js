require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session')
const sassMiddleware = require('node-sass-middleware');


const indexRouter = require('./routes/index.routes');
const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.routes');

require('./configs/db.config');
require('./configs/passport.config').setup(passport);
require('./configs/hbs.config');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: __dirname + '/sass', 
    dest: __dirname + '/public/stylesheets',
    debug: true, 
    outputStyle: 'compressed',
    prefix: '/stylesheets'
  })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.COOKIE_SECRET || 'SuperSecret - (Change it)',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000
  }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.session = req.user;
  next();
})

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', usersRouter);

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

module.exports = app;
