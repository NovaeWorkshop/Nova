/// <reference path="../../server.d.ts" />
'use strict';

var express  = require('express'),
    passport = require('passport'),
    auth     = require('../auth.service');

var router = express.Router();

function renderSuccessTemplate(token, user) {
    return [
        '<script type="text/javascript">',
        'var token = "', token, '",',
        '    user = ', JSON.stringify(user), ';',
        'window.opener.postMessage({',
        '  status: "success",',
        '  token: token,',
        '  user: user',
        '}, "*");',
        '</script>'
    ].join('');
}

function renderFailTemplate() {
    return [
        '<script type="text/javascript">',
        'window.opener.postMessage({',
        '  status: "fail"',
        '}, "*");',
        '</script>'
    ].join('');
}

router.get('/', passport.authenticate('facebook', { scope: 'email' }));

router.get('/callback', function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
        if (err || !user)
            return res.send(renderFailTemplate());

        req.logIn(user, function(err) {
            if (err)
                return res.send(renderFailTemplate());

            var token = auth.signToken(req.user._id);
            return res.send(renderSuccessTemplate(token, req.user));
        });
    })(req, res, next);
});

module.exports = router;
