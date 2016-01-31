var app = angular.module('angularJsPlayRestApiApp');

app.factory('UserService', ['$localStorage', '$rootScope', '$http', '$location', function($localStorage, $rootScope, $http, $location) {
  var user = {
    isLoggedIn: false,
    userName: '',
    authenticate : function(args){
      var parameters = {};
      FB.api('/me', function(me) {
        parameters = {
          email : me.email,
          info :{
            accessToken : args.auth_token,
            expiresIn : args.expires_in
          }
        }

        $http.post('api/authenticate/facebook', parameters).success(function (response) {
          $localStorage.token = response.token;
          $location.path("/");
          user.userName = me.name;
          user.isLoggedIn = true;
        }).error(function(){
          user.userName = null;
          user.isLoggedIn = false;
          console.log("error logging in to the app.")
        });
      });
    }
  };

  $rootScope.$on("fb_connected", function (event, args) {
    user.authenticate(args);
  });


  return user;
}]);




