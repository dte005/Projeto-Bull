const models = require('../models');
const User = models.User;
import Queue from '../lib/queue';

exports.show = (req, res)=>{
    res.render('login', {error: req.flash('error')});
}

exports.login = (req, res)=>{
    User.findOne({where:{email: req.body.email}})
    .then(async function(user){
        if(user){
            if(user.dataValues.password === req.body.password){
                //No momento esse email esta sendo enviado utilizando recursos da maquina e da aplicacao
                //Ideal seria rodar em outro lugar para que libere recursos para aplicacao
                return Queue.add({user});
            }else{
                req.flash('error', 'Esta senha é invalida')
                res.redirect('/');
            }
        }else{
            req.flash('error', 'Não existe esse usuário')
            res.redirect('/');
        }
    })
    .then(function(sended){
        res.redirect('/bull');
    })
    .catch(function(error){
        console.log(error);
        req.flash('error', 'Houve um erro ao tentar logar')
        res.redirect('/');
    })
    
}