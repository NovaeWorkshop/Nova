/// <reference path="../../server.d.ts" />
'use strict';

var passport         = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config           = require('../../config/environment');

exports.setup = function(User) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    }, function(accessToken, refreshToken, profile, done) {

        User.findOne({ 'facebook.id': profile.id }, function(err, user) {
            if (err)
                return done(err);

            if (!user) {
                var data = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.username,
                    provider_id: profile.id,
                    provider: 'facebook',
                    facebook: profile._json
                };

                user = new User(data);
                user.save(function(err) {
                    return done(err, user);
                });

            } else
                return done(err, user);
        });
    }));
};
