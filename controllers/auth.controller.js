const passport = require('passport');

module.exports.loginCallback = (req, res, next) => {
    passport.authenticate ('spotify',(error, user) => {
        console.log('User: ', user);
        if (error) {
            console.log('Error: ',  error)
            next(error);
        } else {
            req.login(user,(error) => {
                if (error) {
                    next (error)
                } else {
                    res.redirect(`/user/${user._id}`)
                }
            });
        }
    }) (req, res, next);
};



