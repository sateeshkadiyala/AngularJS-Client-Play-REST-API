'use strict';

/**
 * @ngdoc function
 * @name angularJsPlayRestApiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularJsPlayRestApiApp
 */
angular.module('angularJsPlayRestApiApp')
  .controller('MainCtrl', function ($scope, $http) {
        $scope.authFB = function(){

            $http.post('api/authenticate').success(function(data){

                console.log(data.message);

            }).error(function(){
                console.log("Failed to authenticate using Face Book");
            })

        }


  });
