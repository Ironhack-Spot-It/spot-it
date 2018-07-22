const passport = require('passport');

module.exports.loginCallback = (req, res, next) => {
    passport.authenticate ('spotify-auth',(error, user) => {
        if (error) {
            console.log('Error: ',  error)
            next(error);
        } else {
            req.login(user,(error) => {
                if (error) {
                    next (error)
                } else {
                    res.redirect('/user/:id')
                }
            });
        }
    }) (req, res, next);
};



