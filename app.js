const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;

const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

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