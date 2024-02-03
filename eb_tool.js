
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
const https = require('https');
const fs = require('fs');
const multer = require('multer');
//const multerS3 = require('multer-s3');
var flash = require('connect-flash');

const cors = require('cors');



var indexRouter = require('./routes/index');
var app_sample_newUser = require('./routes/newUser');
var app_sample_client = require('./routes/client');
var app_sample_sender = require('./routes/sender');
var customEmpRouter = require('./routes/customEmp');
var assigntaskRouter = require('./routes/assigntask');

var alltaskRouter = require('./routes/alltask');


var loginRouter = require('./routes/login');
var customEmpRouter = require('./routes/customEmp');
var fileuploadRouter = require('./routes/fileupload');
var app = express();


app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret : 'webslesson',
  resave : true,
  saveUninitialized : true
}));
app.use(flash());

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/newUser', app_sample_newUser);
app.use('/client', app_sample_client);
app.use('/sender', app_sample_sender);
app.use('/assigntask', assigntaskRouter);

app.use('/alltask', alltaskRouter);


app.use('/login', loginRouter);
app.use('/customEmp', customEmpRouter);
app.use('/fileupload', fileuploadRouter);
app.get('/logout', function(req, res, next) {
req.session.destroy(function(err) {
   // res.send("logged out");
    res.redirect("/login");
 })
 
});
//serving public file
app.use(express.static(__dirname));

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


app.use(function (req, res, next) {
  if (req.session && req.session.user_name)
   res.locals.user_name = true;
  next();
 });


app.use(function (req, res, next) {
  res.locals.user_name = req.session.user_name;
 // console.log(user_name);
  next();
});
//app.use(session);







 const PORT = 7777
// app.listen(port, () => {
//   console.log(`Example app listening on port within eb-tool.js file : :  ${port}`)
// })



const start = async () => {
    try{
      
        // app.listen(PORT, console.log(`server start on port no ${PORT} ...`));
        https.createServer({
            key: fs.readFileSync('../../ssl/keys/a29f8_8d7df_56c5c442ed9b45ced619080b5e0e088f.key'),
           cert: fs.readFileSync('../../ssl/certs/staging_webtechstar_com_a29f8_8d7df_1713830399_0c206f09ff0f4fbef4b10f4dde6beb75.crt')
       }, app).listen(PORT, () => {
         console.log(`listening on port within eb-tool.js file : :  ${PORT}`);
       })
    } catch(error) {
        console.log(error);
    }
};

start()

module.exports = app;





