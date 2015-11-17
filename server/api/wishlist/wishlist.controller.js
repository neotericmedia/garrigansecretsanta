'use strict';

var _ = require('lodash');
var Wishlist = require('./wishlist.model');


  exports.index = function(req, res) {
    Wishlist.loadRecent(function (err, wishlists) {
      if(err) { return handleError(res, err); }
      return res.json(200, wishlists);
    });
  };

  exports.show = function(req, res) {
    Wishlist.findById(req.params.id, function (err, wishlist) {
      if(err) { return handleError(res, err); }
      if(!Wishlist) { return res.send(404); }
      return res.json(wishlist);
    });
  };
  exports.show2 = function(req, res) {
    Wishlist.findById(req.user._id, function (err, wishlist) {
      if(err) { return handleError(res, err); }
      if(!Wishlist) { return res.send(404); }
      return res.json(wishlist);
    });
  };

  exports.create = function(req, res) {
    delete req.body.date;
    var wishlist = new Wishlist(_.merge({
       author: req.user._id
    }, req.body));
    wishlist.save(function(err,wishlist) {
      if(err) { return handleError(res, err); }
      return res.json(201, wishlist);
    });
  };

  exports.destroy = function(req, res) {
    Wishlist.findById(req.params.id, function (err, wishlist) {
      if(err) { return handleError(res, err); }
      if(!wishlist) { return res.send(404); }
      wishlist.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.send(204);
      });
    });
  };

  function handleError(res, err) {
    return res.send(500, err);
  }

  exports.getAdminContent = function(req, res) {
    Wishlist.find({
      author: req.params.id
  }, function(err, wishlist) {
      if (err)
        return console.log(err);
        return res.send(wishlist);
      });
    };

    function handleError(res, err) {
      return res.send(500, err);
    };

  exports.getAuthorContent = function(req, res) {
    Wishlist.find({
      author: req.body.name
  }, function(err, wishlist) {
      if (err)
        return console.log(err);
        return res.send(wishlist);
      });
    };

    function handleError(res, err) {
      return res.send(500, err);
    };
