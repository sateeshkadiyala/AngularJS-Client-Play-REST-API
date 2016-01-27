'use strict';

/**
 * @ngdoc function
 * @name angularJsPlayRestApiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularJsPlayRestApiApp
 */
angular.module('angularJsPlayRestApiApp')
  .controller('RestrictedCtrl', function ($scope, $http, $localStorage) {
    $scope.getSecrets = function(){

      var config = {
        headers : {
          "Content-Type" : "application/json",
          "X-AUTH-TOKEN" :  $localStorage.token
        }

      }

      $http.get('api/restricted', config).then(function(response){
        $scope.secrets = response.data.message;
        console.log(response.data.message);
      }, function(){
        console.log("Failed to authenticate using Face Book");
      })

    }


  });
