const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const messagesRouter = require('./routes/messages');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(500).send({ error: 'Something failed!' })
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})