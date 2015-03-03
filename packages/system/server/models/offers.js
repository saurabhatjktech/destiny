'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Offer Schema
 */
var OfferSchema = new Schema({
	title : {
		type : String,
		required : true,
		trim : true
	},
	image : {
		type : String,
		required : true
	},
	link : {
		type : String,
	},
	html : {
		type : String,

	}
});

/**
 * Statics
 */
OfferSchema.statics.load = function(id, cb) {
	this.findOne({
		_id : id
	}).exec(cb);

};

mongoose.model('Offers', OfferSchema);
