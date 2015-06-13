/// <reference path="../../server.d.ts" />
'use strict';

var express    = require('express'),
    router     = express.Router(),
    controller = require('./user.controller'),
    auth       = require('../../auth/auth.service');

router.get('/me', auth.isAuthenticated(), controller.getMe);
router.post('/', controller.create);

module.exports = router;
