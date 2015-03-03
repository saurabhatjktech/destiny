'use strict';

var mongoose = require('mongoose'),
    Offers = mongoose.model('Offers'),
    _ = require('lodash');

/**
 * Find offer by id
 */
exports.offer = function(req, res, next, id) {
	Offers.load(id, function(err, offer) {
		if (err)
			return next(err);
		if (!offer)
			return next(new Error('Failed to load offer ' + id));
		req.offer = offer;
		next();
	});
};

/**
 * Create an offer
 */
exports.create = function(req, res) {
	var offer = new Offers(req.body);

	offer.save(function(err) {

		if (err) {
			return res.json(500, {
				error : 'Cannot save the offer'
			});
		}
		res.json(offer);

	});
};

/**
 * Save/Update offer
 */
exports.updateOffers = function(req, res) {
	var offer = req.offer;
	offer = _.extend(offer, req.body);
	offer.save(function(err) {
		if (err) {
			return res.json(500, {
				error : 'Cannot update the offer'
			});
		}
		res.json(offer);
	});
};

/**
 * List of Offers
 */
exports.findAll = function(req, res) {
	Offers.find().exec(function(err, offers) {

		if (err) {
			return res.json(500, {
				error : 'Cannot list the offers'
			});
		}
		res.json(offers);

	});
}; 