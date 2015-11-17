/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Wishlist = require('./wishlist.model');

exports.register = function(socket) {
  Wishlist.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Wishlist.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

//function onSave(socket, doc, cb) {
  //socket.emit('wishlist:save', doc);
//}

function onSave(socket, doc, cb) {
  Wishlist.populate(doc, {path:'author', select: 'name'}, function(err, wishlist) {
    socket.emit('wishlist:save', wishlist);
  });
}

function onRemove(socket, doc, cb) {
  socket.emit('wishlist:remove', doc);
}
