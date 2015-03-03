'use strict';

/*
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin) {
    return res.send(401, 'User is not authorized');
  }
  next();
};*/


module.exports = function(System, app, auth, database) {

	var offers = require('../controllers/offers');
	app.route('/offers/:offerId').get(offers.offer)
	.put(offers.updateOffers);
    app.route('/offers/').get(offers.findAll)
    .post(auth.requiresLogin, offers.create);
    
    // Finish with setting up the productId param
  	app.param('offerId', offers.offer);
};