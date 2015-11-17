'use strict';

angular.module('secretSantaApp')
  .controller('MainCtrl', function ($scope, $http, User, Auth, socket) {




      $scope.oneAtATime = false;

      $scope.status = {
       isFirstOpen: true,
       isFirstDisabled: false
      };

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
      })





  });
