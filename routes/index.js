const   express = require('express'),
        router  = express.Router(),
        User    = require('../models/user'),
		Product = require('../models/product'),
		multer  = require('multer'),
		path	= require('path'),
		storage = multer.diskStorage({
					destination: function(req, file, callback){
						callback(null,'./public/upload/');
					},
					filename: function(req, file, callback){
						callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
					}
		});
		imageFilter = function(req, file, callback){
			if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
				return callback(new Error('Only jpg, jpeg, png and gif'), false);
			}
			callback(null, true);
		},
		upload = multer({storage:storage, fileFilter:imageFilter}),
        passport= require('passport');

router.get("/", function(req, res){
	res.redirect("/products");
	// res.render("landing.ejs");
});

router.get('/register', function(req, res){
	res.render('register.ejs');
});

router.post('/register', upload.single('profileImage'), function(req, res){
	req.body.profileImage = '/upload/' + req.file.filename;
	let newUser = new User({username: req.body.username,
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
							profileImage: req.body.profileImage
	});
	if(req.body.adminCode === 'topsecret'){
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			req.flash('error', err.message);
			return res.redirect('/register');
		}else{
			passport.authenticate('local')(req, res, function(){
			req.flash('success', user.username + ' Welcome to ShopIT');
			res.redirect('/products');
			});
		}
	});
});

router.get('/login', function(req, res){
	res.render('login.ejs');
});

router.post('/login', passport.authenticate('local',
	{	//Middleware
		successRedirect: '/products',
		failureRedirect: '/login',
		successFlash: true,
		failureFlash: true,
		successFlash: 'Successfully login',
		failureFlash: 'Invalid username or password'
	}), function(req,res){
});

router.get('/logout', function(req, res){
	req.logOut();
	req.flash('success', 'Log you out success');
	res.redirect('/');
});

module.exports = router;