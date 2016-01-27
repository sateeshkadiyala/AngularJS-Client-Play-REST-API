var controllers = angular.module('angularJsPlayRestApiApp.controllers', []);


controllers.controller('loginCtrl', ['AuthService', '$scope', '$rootScope', '$http', '$location', '$localStorage', 'UserService',
     function(AuthService, $scope, $rootScope, $http, $location, $localStorage, UserService) {
  $scope.info = {};

  $rootScope.$on("fb_statusChange", function (event, args) {
    $rootScope.fb_status = args.status;
    $rootScope.$apply();
  });
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

  $rootScope.$on("fb_connected", function (event, args) {
    $scope.authenticateViaFacebook(args);
  });

       $scope.authenticateViaFacebook =function(args){
          $scope.parameters = {};
         FB.api('/me', function(me) {
           $scope.parameters = {
               email : me.email,
               info :{
                 accessToken : args.auth_token,
                 expiresIn : args.expires_in
               }
             }

           $http.post('api/authenticate/facebook', $scope.parameters).success(function (response) {
             $localStorage.token = response.token;
             $location.path("/");
             UserService.userName = me.name;
             UserService.isLoggedIn = true;
           }).error(function(){
             UserService.userName = null;
             UserService.isLoggedIn = false;
             console.log("error logging in to the app.")
           });
         });
       }


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
