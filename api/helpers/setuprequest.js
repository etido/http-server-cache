module.exports = function(req, res, next) {
    req.starttime = process.hrtime(); // reset the timer
    next();
}