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
	images : {
		name : {
			type : String,
			required : false,
			trim : true
		},
		src : {
			type : String,
			required : false,
			trim : true
		},
		size : {
			type : String,
			required : false,
			trim : true
		},
		type : {
			type : String,
			required : false,
			trim : true
		},
		created : {
			type : Date,
			required : false,
			trim : true
		}
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
