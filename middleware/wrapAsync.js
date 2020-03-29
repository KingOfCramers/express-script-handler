function wrapAsync(fn){
  return function(req,res,next){
    // Catch any errors and pass them to next();
    fn(req,res,next).catch(next);
  };
}

module.exports = wrapAsync
