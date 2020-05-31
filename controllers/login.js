const models = require('../models');
const User = models.User;
import Queue from '../lib/queue';
import bcrypt from 'bcrypt-nodejs';

exports.show = (req, res)=>{
    res.render('login', {error: req.flash('error')});
}

exports.login = (req, res)=>{
    var userInstance = undefined;

    const isValidPassword = function(userPass, password){
        return bcrypt.compareSync(password, userPass);
    }

    User.findOne({where:{email: req.body.email}})
    .then(async function(user){
        if(user){
            userInstance = user;
            if(isValidPassword(user.dataValues.password, req.body.password)){
                //No momento esse email esta sendo enviado utilizando recursos da maquina e da aplicacao
                //Ideal seria rodar em outro lugar para que libere recursos para aplicacao
                // return Queue.add({user});
                req.session.user = user.dataValues.id;
                return Queue.add('loginMail',{user});
            }else{
                req.flash('error', 'Esta senha é invalida')
                res.redirect('/login');
            }
        }else{
            req.flash('error', 'Não existe esse usuário')
            res.redirect('/login');
        }
    })
    .then(function(sended){
        res.redirect('/');
    })
    .catch(function(error){
        console.log(error);
        req.flash('error', 'Houve um erro ao tentar logar')
        res.redirect('/login');
    })
    
}

exports.signup = (req, res)=>{
    res.render('signup', {error: req.flash('error')});
}

exports.createUser = (req, res)=>{

    const generateCrypt = function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }

    let data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: generateCrypt(req.body.password)
    }

    User.create(data)
    .then(function(user){
        if(user){
            req.session.user = user.dataValues.id;
            return Queue.add('loginMail',{user}); //enviando email no background
        }else{
            req.flash('error', 'Houve um erro ao criar a conta')
            res.redirect('/login/signup');
        }
    })
    .then(function(sended){
        res.redirect('/');
    })
    .catch(function(error){
        if(error){
            req.flash('error', 'Houve um erro geral de criacao de conta')
            res.redirect('/login/signup');
        }
    })
}