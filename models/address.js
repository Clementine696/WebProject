const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	address_name: String,
	receiver: String,
	tel: String,

    houseaddress: String,
    sub_district: String,
    district: String,
    province: String,
    zipcode: String
});

module.exports = mongoose.model('Address', addressSchema);