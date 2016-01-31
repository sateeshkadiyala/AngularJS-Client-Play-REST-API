angular.module('angularJsPlayRestApiApp').factory('AuthService', ['$rootScope', '$q' , 'UserService', function($rootScope, $q, UserService) {
  var service = {
      getLoginStatus: function () {
        FB.getLoginStatus(function (response) {
          $rootScope.$broadcast("fb_statusChange", {'status': response.status});
        }, true);
      },
      login: function () {
        FB.getLoginStatus(function (response) {
          switch (response.status) {
            case 'connected':
              $rootScope.$broadcast('fb_connected', {
                facebook_id: response.authResponse.userID,
                auth_token: response.authResponse.accessToken,
                expires_in: response.authResponse.expiresIn
              });
              break;
            case 'not_authorized':
            case 'unknown':
              FB.login(function (response) {
                if (response.authResponse) {
                  $rootScope.$broadcast('fb_connected', {
                    facebook_id: response.authResponse.userID,
                    auth_token: response.authResponse.accessToken,
                    expires_in: response.authResponse.expiresIn,
                    userNotAuthorized: true
                  });
                } else {
                  $rootScope.$broadcast('fb_login_failed');
                }
              }, {scope: 'read_stream, email'});
              break;
            default:
              FB.login(function (response) {
                if (response.authResponse) {
                  $rootScope.$broadcast('fb_connected', {
                    facebook_id: response.authResponse.userID,
                    auth_token: response.authResponse.accessToken,
                    expires_in: response.authResponse.expiresIn
                  });
                  $rootScope.$broadcast('fb_get_login_status');
                } else {
                  $rootScope.$broadcast('fb_login_failed');
                }
              });
              break;
          }
        }, true);
      },
      logout: function () {
        FB.logout(function (response) {
          if (response) {
            $rootScope.$broadcast('fb_logout_succeded');
          } else {
            $rootScope.$broadcast('fb_logout_failed');
          }
        });
      },
      unsubscribe: function () {
        FB.api("/me/permissions", "DELETE", function (response) {
          $rootScope.$broadcast('fb_get_login_status');
        });
      },
}

  $rootScope.$on("fb_statusChange", function (event, args) {
    $rootScope.fb_status = args.status;
    if(args.status == "connected")
      service.login();
  });

  return service;
}]);
