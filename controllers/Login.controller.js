const models = require("../models");
const User = models.User;
import Queue from '../lib/queue';
import bcrypt from 'bcrypt-nodejs';

class LoginController {
    static async show(req, res){
        res.render('login', {error: req.flash('error')});
    }

    static async login(req, res){
        let userInstance = undefined;

        const isValidPassword = function(userPass, password) {
            return bcrypt.compareSync(password, userPass);
        }

        User.findOne({where:{email: req.body.email}})
            .then(async function(user){
                if(user){
                    if(isValidPassword(user.dataValues.password, req.body.password)){
                        userInstance = user;
                        req.session.user = user.dataValues.id;
                        return Queue.add('loginMail',{user});
                    }else{
                        throw "Senha incorreta";
                    }

                }else{
                    throw "Email não está correto";
                }
            })
            .then(function(sended){
                res.redirect('/');
            })
            .catch(function(error){
                console.log(error);
                req.flash('error', error);
                res.redirect('/login');
            })
    }
    static async signup(req, res){
        res.render('signup', {error: req.flash('error')});
    }

    static async createUser(req, res){
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
                    throw "Houve um erro ao criar a conta";
                }
            })
            .then(function(sended){
                res.redirect('/');
            })
            .catch(function(error){
                if(error){
                    req.flash('error', error)
                    res.redirect('/login/signup');
                }
            })
    }
}

export default LoginController