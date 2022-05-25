const   express = require('express'),
        router  = express.Router(),
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
		Product   = require('../models/product');

router.get("/", function(req, res){
	Product.find({}, function(err, allProducts){
		if(err){
			console.log(err);
		} else{
			res.render("product/index.ejs",{products: allProducts});
		}
	});
});

router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res){
	req.body.product.image = '/upload/' + req.file.filename;
	Product.create(/*newPrint*/req.body.product, function(err, newlyAdded){
		if(err){
			console.log(err);
		} else{
			res.redirect("/products");
		}
	});
});

router.get("/new",middleware.isLoggedIn, function(req, res){
	res.render("product/new.ejs");
});

// router.get("/:id", function(req, res){
// 	Product.findById(req.params.id, function(err, foundProduct){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			res.render('product/show.ejs', {product: foundProduct});
// 		}
// 	});
// });

router.get("/:id", function(req, res){
	Product.findById(req.params.id, function(err, foundProduct){
		if(err){
			console.log(err);
		} else{
			User.find({}, function(err, alluser){
				if(err){
					console.log(err);
				} else{
					res.render('product/show.ejs', {product: foundProduct, users:alluser});
				}
			});
		}
	});
});

router.get("/:id/edit", middleware.checkAdmin, function(req, res){
	Product.findById(req.params.id, function(err, foundProduct){
		if(err){
			console.log(err);
		}else{
			res.render('product/edit.ejs', {product: foundProduct});
		}
	});
});

router.put('/:id', upload.single('image'), function(req, res){
	if(req.file){
		req.body.product.image = '/upload/' + req.file.filename;
	}
	Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProduct){
		if(err){
			console.log(err);
			res.redirect('/products/');
		}else{
			res.redirect('/products/' + req.params.id);
		}
	});
});

router.delete('/:id', middleware.checkAdmin, function(req, res){
	Product.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		}
		res.redirect('/products');
	});
});

router.post("/:id/addtocart", middleware.isLoggedIn, function(req, res){
	Product.findById(req.params.id, function(err, foundProduct){
		if(err){
			console.log(err);
		} else{
			User.findById(req.user._id, function(err, foundUser){
				if(err){
					console.log(err);
				} else{
					const newcart = {product: foundProduct , quantity:req.body.QTY};
					foundUser.carts.push(newcart);
					foundUser.save();
					res.redirect('/user/' + foundUser._id +"/basket");
				}
			});
		}
	});
});

router.get("/s/:keyword", function(req, res){
	let search = req.params.keyword;
	console.log(search);
	Product.find({name: {$regex: search, $options: 'i'}}).exec(function(err, allProducts){
		if(err){
			console.log(err);
		} else{
			res.render("product/index.ejs",{products: allProducts});
		}
	});
});

router.post("/search",function(req, res){
	let keyword = req.body.search;
	console.log(keyword);
	res.redirect("/products/s/" + keyword);
});

// router.post("/search", function(req, res){
// 	let search = req.body.search;
// 	console.log(search);
// 	Product.find({name: {$regex: search, $options: 'i'}}).exec(function(err, allProducts){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			res.render("product/index.ejs",{products: allProducts});
// 		}
// 	});
// });

router.get("/category/:id", function(req, res){
	Product.find({name: {$regex: req.params.id, $options: 'i'}}).exec(function(err, allProducts){
		if(err){
			console.log(err);
		} else{
			res.render("product/indexsort.ejs",{products: allProducts, categoryid: req.params.id});
		}
	});
});

router.get("/category/:id/:sort", function(req, res){
	let condition =req.params.sort;
	if(condition=="az"){	
		Product.find({name: {$regex: req.params.id, $options: 'i'}}).sort({name:1}).exec(function(err, allProducts){
			if(err){
				console.log(err);
			} else{
				res.render("product/indexsort.ejs",{products: allProducts, categoryid: req.params.id});
			}
		});
	}else if(condition=="za"){
		Product.find({name: {$regex: req.params.id, $options: 'i'}}).sort({name:-1}).exec(function(err, allProducts){
			if(err){
				console.log(err);
			} else{
				res.render("product/indexsort.ejs",{products: allProducts, categoryid: req.params.id});
			}
		});
	}else if(condition=="low"){
		Product.find({name: {$regex: req.params.id, $options: 'i'}}).sort({price:1}).exec(function(err, allProducts){
			if(err){
				console.log(err);
			} else{
				res.render("product/indexsort.ejs",{products: allProducts, categoryid: req.params.id});
			}
		});
	}else if(condition=="high"){
		Product.find({name: {$regex: req.params.id, $options: 'i'}}).sort({price:-1}).exec(function(err, allProducts){
			if(err){
				console.log(err);
			} else{
				res.render("product/indexsort.ejs",{products: allProducts, categoryid: req.params.id});
			}
		});
	}
});


module.exports = router;