'use strict';

/**
 * @ngdoc function
 * @name angularJsPlayRestApiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularJsPlayRestApiApp
 */
angular.module('angularJsPlayRestApiApp')
  .controller('NavCtrl', ['UserService', '$scope', 'AuthService', '$localStorage', '$location', '$http', function(UserService, scope, AuthService, $localStorage, $location, $http){

      scope.hideLogin = function(){
          if(UserService.isLoggedIn)
            return true;
          else
            return false;
        }

    scope.logout = function () {
      AuthService.logout();
      $http.get("api/authenticate/logout").success(function(response){
        //$rootScope.$broadcast('fb_user_logged_out');
        UserService.userName = null;
        UserService.isLoggedIn = false;
        $localStorage.token = null;
        $location.path("/login");
        console.log("user logged out");
      }).error(function(){
        console.log("error logging out");
      });
    };

  }]);
