'use strict';

var mongoose = require('mongoose'), 
Configs = mongoose.model('Configs'), 
_ = require('lodash');

/**
 * Find config by id
 */
exports.config = function(req, res, next, id) {
  Configs.load(id, function(err, config) {
    if (err) return next(err);
    if (!config) return next(new Error('Failed to load product ' + id));
    req.config = config;
    next();
  });
};

exports.getHomePageConfigsFromDB = function(req, res) {

	var nameString = new RegExp(req.query.name);
  	var json = {
    	name: nameString
  	};

	  Configs.find(json).exec(function(err, configs) {
    	if (err) {
      		return res.json(500, {
      		error: 'Cannot load the configs'
      		});
    	}
    	res.json(configs);
  	});
};

/**
 * Save/Update cart
 */
exports.updateConfigs = function(req, res) {
  var config = req.config;
  config = _.extend(config, req.body);
  config.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the config'
      });
    }
    res.json(config);
  });
};
