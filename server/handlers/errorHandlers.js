/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/*
  Not Found Error Handler

  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

/*
  Development Error Hanlder

  In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    error: err,
    stack: err.stack
  };
  res.status(err.status || 500);
  res.send(errorDetails);
  return;
};

/*
  Production Error Handler

  No stacktraces are leaked to user
*/
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
  return;
};