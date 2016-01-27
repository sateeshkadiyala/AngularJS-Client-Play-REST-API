var app = angular.module('angularJsPlayRestApiApp');

app.factory('UserService', [function() {
  var user = {
    isLoggedIn: false,
    userName: ''
  };
  return user;
}]);




