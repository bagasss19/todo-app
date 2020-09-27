const { User } = require("../models")
const {compare} = require('../helper/bycript')
//const email = require('../helper/nodemail')

class Controller { 
    static login(req,res) {
        const { username, password } = req.body;

        User.findOne({
        where: {
                username
            }
        })
        .then(result => {
            if(result){
                //console.log(result);
                if(compare(password, result.password)){
                    req.session.login = true
                    req.session.userId = result.id
                    res.redirect(`/todo`)
                }
                else{
                    req.session.msg = `wrong username/password!`;
                    res.redirect("/");
                }
            }else{
                // req.session.isLogin = false;
                req.session.msg = `wrong username/password!`;
                res.redirect("/");
            }
        })
        .catch(err => {
            req.session.msg = err.messages;
            res.redirect("/");
        })
    }

    static logout(req,res) {
        delete req.session.login
        req.session.msg = `Logout Success`
        res.redirect('/')
    }

    static register(req,res) {
        const msg = req.session.msg || null;
        delete req.session.msg
        res.render('register', {msg})
    }

    static add (req, res) {
        if(req.body.password != req.body.confirm_password){
            req.session.msg = `Password dan Confirm Password tidak sama`;
            res.redirect("/register");
        }
        else{
            User.create(req.body)
            .then(data => {
                req.session.msg = `sukses membuat akun`
                res.redirect('/')
            })
            .catch(err => {
                req.session.msg = err.messages;
                res.redirect("/register");
            })
        }
    }
}

module.exports = Controller