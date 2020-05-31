exports.show = (req, res)=>{
    res.render('bull/show');
}

exports.batepapo = (req, res)=>{
    res.render('bull/batepapo');
}

exports.logout = (req, res)=>{
    if(req.session){
        req.session.destroy();
        res.redirect('/login');
    }else{
        res.redirect('/login');
    }
}