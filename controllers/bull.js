const models = require('../models');
const User = models.User;

exports.show = (req, res)=>{
    res.render('bull/show');
}

exports.batepapo = (req, res)=>{
    let user = req.session.user;
    User.findByPk(user)
    .then(function(user){
        res.render('bull/batepapo', {logado: user});
    })
    .catch(function(error){
        req.session.destroy();
        res.redirect('/login');
    })
    
}

exports.logout = (req, res)=>{
    if(req.session){
        req.session.destroy();
        res.redirect('/login');
    }else{
        res.redirect('/login');
    }
}