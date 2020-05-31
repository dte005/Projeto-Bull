const models = require('../models');
const User = models.User;

exports.validEmailToSignup = (req, res, next)=>{
    User.findOne({where:{email:req.body.email}})
    .then(function(user){
        if(!user){
            return next();
        }
        req.flash('error', 'Esse email ja existe em nossa base');
        return res.redirect('/login/signup');
    })
}