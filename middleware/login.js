function checkLogin (req, res, next){
    if(req.session.login){
        next();
    } else{
        req.session.msg = `you have to login to access this!`
        res.redirect('/')
    }
}


module.exports = checkLogin
