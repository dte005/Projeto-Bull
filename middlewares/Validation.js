import User from "../models/user";

class Validation {
    static isLogged (req, res, next) {
        if(req.session.user){
            return next();
        }
        res.redirect('/login');
    }

    static validEmailToSignup(req, res, next){
        User.findOne({where:{email:req.body.email}})
            .then(function(user){
                if(!user){
                    return next();
                }
                req.flash('error', 'Esse email ja existe em nossa base');
                return res.redirect('/login/signup');
            })
    }
}

export default Validation;