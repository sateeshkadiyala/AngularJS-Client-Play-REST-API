'use strict';

/**
 * @ngdoc function
 * @name angularJsPlayRestApiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularJsPlayRestApiApp
 */
angular.module('angularJsPlayRestApiApp')
  .controller('MainCtrl', ['UserService', '$scope', function(UserService, scope){

    scope.user = UserService;

    /*$scope.$on('fb_user_logged_out', function(){
       scope.user = UserService.
    });
*/
  }]);
