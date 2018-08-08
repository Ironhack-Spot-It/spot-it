module.exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(401)
            .redirect('/');
    }
}

module.exports.isProfileOwner = (req, res, next) => {
    return req.user.name === req.params.name

}