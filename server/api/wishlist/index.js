'use strict';

var express = require('express');
var controller = require('./wishlist.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.get('/admin/:id', controller.getAdminContent);
router.get('/author/:name', controller.getAuthorContent);

module.exports = router;
