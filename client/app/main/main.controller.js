'use strict';

angular.module('secretSantaApp')
  .controller('MainCtrl', function ($scope, $http, User, Auth, socket) {

      $scope.currentPage = 1;
      $scope.pageSize = '';
      $scope.meals = [];


      $(".blah").hide();
      $("#hide").click(function(){
         $(".blah").slideUp(500);
         setTimeout(function() {
              $('#show').fadeIn(500);
          },500);
      });
      $("#show").click(function(){
         $("#show").fadeOut(500);
         $(".blah").slideDown(500);
      });


      $scope.clearSearch = function () {
          $scope.q = "";
      };

      $scope.longNumberLimit = 150;
      $scope.addMore = "more";

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
        socket.syncUpdates('wishlist', $scope.wishlists, function(event, wishlist, wishlists) {
          wishlists.sort(function(a, b) {
             a = new Date(a.date);
             b = new Date(b.date);
             return a>b ? -1 : a<b ? 1 : 0;
          });
        });
      })

  })



  .controller('OtherController', ['$scope',
   function($scope) {

     $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
     };

   }
 ])
