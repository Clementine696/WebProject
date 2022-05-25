const { route } = require('express/lib/application');

const   express = require('express'),
        router  = express.Router(),
        User    = require('../models/user'),
		Product = require('../models/product'),
		Address = require('../models/address'),
		Payment = require('../models/payment'),
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
        middleware = require('../middleware'),
        passport= require('passport');

router.get('/:id', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			res.render('user/show.ejs', {user: foundUser});
		}
	});
});

router.get('/:id/profile', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			res.render('user/profile.ejs', {user: foundUser});
		}
	});
});

router.get('/:id/delivery', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id).populate('addresses').exec(function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			res.render('delivery/show.ejs', {user: foundUser});
		}
	});
});

router.get('/:id/new_address', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			res.render('delivery/new.ejs', {user: foundUser});
		}
	});
});

router.post("/:id/new_address", middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			console.log(err);
		} else{
			Address.create(req.body.address, function(err, address){
				if(err){
					console.log(err);
				}else{
					address.author.id = req.user._id;
					address.author.username = req.user.username;
					address.save();
					foundUser.addresses.push(address);
					foundUser.save();
					res.redirect('/user/' + foundUser._id +"/delivery");
				}
			});
		}
	});
});

router.get('/:id/:addressid/edit', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			Address.findById(req.params.addressid, function(err, foundAddress){
				if(err){
					req.flash('error', 'There is something wrong');
					return res.redirect('/');
				}
				else
				{
					res.render('delivery/edit.ejs', {address: foundAddress});
				}
			});
		}
	});
});

router.put('/:id/:addressid', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			Address.findByIdAndUpdate(req.params.addressid, req.body.address, function(err, foundAddress){
				if(err){
					req.flash('error', 'There is something wrong');
					return res.redirect('/');
				}
				else
				{
					res.redirect('/user/' + foundUser._id +"/delivery");
				}
			});
		}
	});
});

router.delete('/:id/:addressid', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			Address.findById(req.params.addressid, function(err, foundAddress){
				if(err){
					console.log(err);
				}
				else{
					foundUser.addresses.pull(foundAddress);
					foundUser.save();
				}
			});
			Address.findByIdAndRemove(req.params.addressid, function(err){
			if(err){
				console.log(err);
			}
			res.redirect('/user/' + foundUser._id +"/delivery");
			});
		}
	});
});

router.get('/:id/payment', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id).populate('payments').exec(function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			res.render('payment/show.ejs', {user: foundUser});
		}
	});
});

router.get('/:id/new_payment', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			res.render('payment/new.ejs', {user: foundUser});
		}
	});
});

router.post("/:id/new_payment", middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			console.log(err);
		} else{
			Payment.create(req.body.payment, function(err, payment){
				if(err){
					console.log(err);
				}else{
					payment.author.id = req.user._id;
					payment.author.username = req.user.username;
					payment.save();
					foundUser.payments.push(payment);
					foundUser.save();
					res.redirect('/user/' + foundUser._id +"/payment");
				}
			});
		}
	});
});

router.delete('/:id/p/:paymentid', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			Payment.findById(req.params.paymentid, function(err, foundPayment){
				if(err){
					console.log(err);
				}
				else{
					foundUser.payments.pull(foundPayment);
					foundUser.save();
				}
			});
			Payment.findByIdAndRemove(req.params.paymentid, function(err){
			if(err){
				console.log(err);
			}
			res.redirect('/user/' + foundUser._id +"/payment");
			});
		}
	});
});


router.get('/:id/basket', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id).populate('carts').exec(function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			Product.find({}, function(err, allProducts){
				if(err){
					console.log(err);
				} else{
					res.render('basket/show.ejs', {user: foundUser, products: allProducts});
				}
			});
		}
	});
});

router.post('/quantity/:id/:cartid', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			res.redirect('/user/' + foundUser._id +"/basket");
		}else{
			foundUser.carts.forEach(function(cart){
				if(cart._id.equals(req.params.cartid)){
					User.findByIdAndUpdate(
						foundUser,
						{$push: {"carts": {product: cart.product, quantity: req.body.selectt}}},
						{safe: true, upsert: true},
						function(err, model) {
							console.log(err);
						}
					);
					User.findByIdAndUpdate(
						foundUser,
						{$pull: {"carts": {_id:req.params.cartid, product: cart.product, quantity: cart.quantity}}},
						{safe: true, upsert: true},
						function(err, model) {
							console.log(err);
						}
					);
				}else{
					User.findByIdAndUpdate(
						foundUser,
						{$push: {"carts": {product: cart.product, quantity: cart.quantity}}},
						{safe: true, upsert: true},
						function(err, model) {
							console.log(err);
						}
					);
					User.findByIdAndUpdate(
						foundUser,
						{$pull: {"carts": {_id:cart._id, product: cart.product, quantity: cart.quantity}}},
						{safe: true, upsert: true},
						function(err, model) {
							console.log(err);
						}
					);
				}
			});
			res.redirect('/user/' + foundUser._id +"/basket");
		}
	});
});

router.post('/remove/:id/:cartid', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			res.redirect('/user/' + foundUser._id +"/basket");
		}else{
			foundUser.carts.forEach(function(cart){
				if(cart._id.equals(req.params.cartid)){
					User.findByIdAndUpdate(
						foundUser,
						{$pull: {"carts": {_id:req.params.cartid, product: cart.product, quantity: cart.quantity}}},
						{safe: true, upsert: true},
						function(err, model) {
							console.log(err);
						}
					);
				}
			});
			res.redirect('/user/' + foundUser._id +"/basket");
		}
	});
});


router.delete('/:id/:cartid', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			User.carts.findByIdAndRemove(req.params.cartid, function(err){
			if(err){
				console.log(err);
			}
			res.redirect('/user/' + foundUser._id +"/delivery");
			});
		}
	});
});

router.get('/:id/checkout', middleware.hasAddress, function(req, res){
	User.findById(req.params.id).populate('carts addresses payments').exec(function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			Product.find({}, function(err, allProducts){
				if(err){
					console.log(err);
				} else{
					res.render('basket/checkout.ejs', {user: foundUser, products: allProducts});
				}
			});
		}
	});
});

router.post('/:id/checkoutconfirm', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			Address.findById(req.body.select_deli, function(err, foundAddress){
				if(err){
					req.flash('error', 'There is something wrong');
					return res.redirect('/');
				}else{
					Payment.findById(req.body.select_paym, function(err, foundPayment){
						if(err){
							req.flash('error', 'There is something wrong');
							return res.redirect('/');
						}else{
							foundUser.carts.forEach(function(cart){
								User.findByIdAndUpdate(
									foundUser,
									{$push: {"historys": {product: cart.product, quantity: cart.quantity, address: foundAddress, payment: foundPayment, pay_date: Date()}}},
									{safe: true, upsert: true},
									function(err, model) {
										console.log(err);
									}
								);

								User.findByIdAndUpdate(
									foundUser,
									{$pull: {"carts": {_id:cart._id, product: cart.product, quantity: cart.quantity}}},
									{safe: true, upsert: true},
									function(err, model) {
										console.log(err);
									}
								);

							});
						}
					})
				}
			});
			res.redirect('/user/' + foundUser._id +"/history");
		}
	});
});


router.get('/:id/history', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id).populate('addresses payments').exec(function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			Product.find({}, function(err, allProducts){
				if(err){
					console.log(err);
				} else{
					res.render('user/history.ejs', {user: foundUser, products: allProducts});
				}
			});
		}
	});
});

router.get('/:id/edit', middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash('error', 'There is something wrong');
			return res.redirect('/');
		}else{
			res.render('user/edit.ejs', {user: foundUser});
		}
	});
});

router.put('/:id/u/edit', upload.single('image'), function(req, res){
	let image;
	if(req.file){
		image = '/upload/' + req.file.filename;
	}
	User.findByIdAndUpdate(req.params.id, {firstName:req.body.firstName, lastName:req.body.lastName, email:req.body.email, profileImage:image}, function(err, updatedUser){
		if(err){
			console.log(err);
			res.redirect('/user/' + req.params.id);
		}else{
			res.redirect('/user/' + req.params.id + '/profile');
		}
	});
});

module.exports = router;