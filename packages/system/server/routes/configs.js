'use strict';

/*
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin) {
    return res.send(401, 'User is not authorized');
  }
  next();
};*/


module.exports = function(System, app, auth, database) {

	var configs = require('../controllers/configs');
 	app.route('/configs').get(configs.getHomePageConfigsFromDB);
	app.route('/configs/:configId')
    .put(auth.requiresLogin, configs.updateConfigs);
    
    // Finish with setting up the productId param
  	app.param('configId', configs.config);
};