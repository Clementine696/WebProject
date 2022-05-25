const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	profileImage: String,
	addresses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Address'
		},
	],

	payments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Payment'
		},
	],

	carts: [{
		product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product'
			},
		quantity: Number
	}],

	historys: [{
		product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product'
			},
		address: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Address'
			},
		payment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Payment'
			},
		quantity: Number,
		pay_date: String,
	}],

	// author: {
	// 	id: {
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: 'User'
	// 	},
	// 	username: String
	// },	

	isAdmin: {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);