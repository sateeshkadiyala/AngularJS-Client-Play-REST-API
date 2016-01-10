'use strict';

/**
 * @ngdoc function
 * @name angularJsPlayRestApiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularJsPlayRestApiApp
 */
angular.module('angularJsPlayRestApiApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
