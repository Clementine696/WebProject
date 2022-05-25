const   Product   = require('../models/product');
        User      = require('../models/user');
        // Comment = require('../models/comment');
        
const   middlewareObj = {};

middlewareObj.checkAdmin = function(req, res, next){
    if(req.isAuthenticated()){
        Product.findById(req.params.id, function(err, foundProduct){
            if(err){
                res.redirect('back');
            }else{
                if(req.user.isAdmin){
                    next();
                }else{
                    req.flash('error', "You do not have permission to do this action!");
                    res.redirect('back');
                }
            }
        });
    }else{
        req.flash('error', "You need to login first");
        res.redirect('/login');
    }
}


middlewareObj.isAdmin = function(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.isAdmin){
            next();
        }else{
            req.flash('error', "You do not have permission to do this action!");
            res.redirect('back');
        }
    }else{
        req.flash('error', "You need to login first");
        res.redirect('/login');
        // res.redirect('back');
    }
}


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error','You need to login first');
        res.redirect('/login');
        // res.redirect('back');
    }
}

middlewareObj.hasAddress = function(req, res, next){
    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, foundUser){
            if(foundUser.addresses.length == 0){
                req.flash('error','You need to add delivery address first');
                res.redirect('delivery');
            }else if(foundUser.payments.length == 0){
                req.flash('error','You need to add payment method first');
                res.redirect('payment');
            }
            else{
                next();
            }
        });
    }else{
        req.flash('error','You need to login first');
        res.redirect('/login');
    }
}

module.exports = middlewareObj;