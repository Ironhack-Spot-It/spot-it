const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const spotifyApi = require ('../services/spotify.service');

module.exports.welcome = (req, res, next) => {
    User.findOne({ name: req.params.name })
        .then((user) => {
            if (user) {
                if(user.name === req.user.name ){
                    user.getRelations()
                        .then(matches => {
                            res.render('users/welcome', {
                                user: user,
                                matches 
                            });
                        })
                        .catch(error => next(error));
                }
                else {
                    res.render('users/profile', {
                        user: user
                    });
                } 
            }
        })
    
};

// Logout

module.exports.delete = (req, res, next) => {
    req.logout();
    res.redirect('/');
  }

// module.exports.doDelete = (req, res, next) => {
//     User.findByIdAndRemove(req.params.id)
//       .then(user => {
//         if (!user) {
//           next(createError(404, 'User not found'));
//         } else {
//           res.redirect('/');
//         }
//       })
//       .catch(error => next(error));
//   }

