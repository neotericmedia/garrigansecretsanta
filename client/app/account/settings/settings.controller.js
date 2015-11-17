'use strict';

angular.module('secretSantaApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $http, socket) {

     $scope.isLoggedIn = Auth.isLoggedIn;
     $scope.isAdmin = Auth.isAdmin;
     $scope.getCurrentUser = Auth.getCurrentUser;

     $http.get('/api/users/me')
      .then(function(result) {
         $scope.userId = result.data._id;
         $scope.user = result.data.name;
     })

      $http.get('/api/wishlists').success(function(wishlists) {
        $scope.wishlists = wishlists;
        socket.syncUpdates('wishlist', $scope.wishlists, function(event, wishlist, wishlists) {
          wishlists.sort(function(a, b) {
             a = new Date(a.date);
             b = new Date(b.date);
             return a>b ? -1 : a<b ? 1 : 0;
          });
        });
      });

      $scope.addwishlist = function() {
       $http.post('/api/wishlists', {
           name: $scope.name,
           store: $scope.store,
           other: $scope.other
       });
       $scope.name = '';
       $scope.store = '';
       $scope.other = '';
      };

      $scope.deletewishlist = function(wishlists) {
       $http.delete('/api/wishlists/' + wishlists._id);
      };

      $scope.tinymceOptions = {
       onChange: function(e) {
          // put logic here for keypress and cut/paste changes
       },
       inline: false,
       plugins : 'advlist autolink link image lists charmap print preview',
       skin: 'lightgray',
       theme : 'modern'
      };


    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
