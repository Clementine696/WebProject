const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	card_owner: String,
	card_number: Number,
	expired: String,
	cvc: Number,

});

module.exports = mongoose.model('Payment', paymentSchema);