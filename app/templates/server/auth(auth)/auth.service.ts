/// <reference path="../server.d.ts" />
'use strict';

var config = require('../config/environment'),
	jwt = require('jsonwebtoken'),
	expressJwt = require('express-jwt'),
	compose = require('composable-middleware'),
	User = require('../api/user/user.model'),
	validateJwt = expressJwt({ secret: config.secrets.session });

module.exports = {

	/**
	 * Attach the user object to the request if authenticated
	 * Otherwise returns 403
	 */
	isAuthenticated: function () {
		return compose()
			.use(function(req, res, next) {
				validateJwt(req, res, next);
			})
			.use(function(req, res, next) {
				User.findById(req.user._id, function (err, user) {
					if (err)
						return next(err);

					if (!user)
						return res.send(401);

					req.user = user;
					next();
				});
			});
	},

	/**
	 * Returns a jwt token, signed by the app secret
	 */
	signToken: function(id) {
		return jwt.sign(
			{ _id: id },
			config.secrets.session,
			{ expiresInMinutes: 60 * 5 }
		);
	}

};
