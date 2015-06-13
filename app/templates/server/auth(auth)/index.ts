/// <reference path="../server.d.ts" />
'use strict';

var express = require('express'),
    router  = express.Router(),
    config  = require('../config/environment'),
    User    = require('../api/user/user.model');

require('./local/passport').setup(User, config);
require('./facebook/passport').setup(User, config);

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));

module.exports = router;
