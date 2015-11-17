'use strict';

var _ = require('lodash');
var Wishlist = require('./wishlist.model');

// Get list of wishlists
exports.index = function(req, res) {
  Wishlist.find(function (err, wishlists) {
    if(err) { return handleError(res, err); }
    return res.json(200, wishlists);
  });
};

// Get a single wishlist
exports.show = function(req, res) {
  Wishlist.findById(req.params.id, function (err, wishlist) {
    if(err) { return handleError(res, err); }
    if(!wishlist) { return res.send(404); }
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

// Updates an existing wishlist in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Wishlist.findById(req.params.id, function (err, wishlist) {
    if (err) { return handleError(res, err); }
    if(!wishlist) { return res.send(404); }
    var updated = _.merge(wishlist, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, wishlist);
    });
  });
};

// Deletes a wishlist from the DB.
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
