angular.module('angularJsPlayRestApiApp').controller('loginCtrl', ['AuthService', '$scope', '$rootScope', '$http', '$location', '$localStorage', 'UserService',
     function(AuthService, $scope, $rootScope, $http, $location, $localStorage, UserService) {
  $scope.info = {};
  $rootScope.$on("fb_get_login_status", function () {
    AuthService.getLoginStatus();
  });
  $rootScope.$on("fb_login_failed", function () {
    console.log("fb_login_failed");
  });
  $rootScope.$on("fb_logout_succeded", function () {
    console.log("fb_logout_succeded");
    $rootScope.id = "";
  });
  $rootScope.$on("fb_logout_failed", function () {
    console.log("fb_logout_failed!");
  });

  // button functions
  $scope.getLoginStatus = function () {
    AuthService.getLoginStatus();
  };

  $scope.login = function () {
    AuthService.login();
  };

  $scope.unsubscribe = function () {
    AuthService.unsubscribe();
  }

  $scope.getInfo = function () {
    FB.api('/' + $rootScope.session.facebook_id, function (response) {
      console.log('Good to see you, ' + response.name + '.');
    });
    $rootScope.info = $rootScope.session;

  };


}]);
