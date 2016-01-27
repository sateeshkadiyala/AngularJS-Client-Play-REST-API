'use strict';

/**
 * @ngdoc overview
 * @name angularJsPlayRestApiApp
 * @description
 * # angularJsPlayRestApiApp
 *
 * Main module of the application.
 */
var angularJsPlayRestApiApp = angular
  .module('angularJsPlayRestApiApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    'angularJsPlayRestApiApp.controllers',
    'ngMaterial'

  ]);

angularJsPlayRestApiApp.run(['$rootScope', '$window',
  function($rootScope, $window) {
    $window.fbAsyncInit = function() {

      FB.init({
        appId: '352335531633537',
        channelUrl: 'app/channel.html',
        status: true,
        cookie: true,
        xfbml: true
      });
      FB.Event.subscribe('auth.statusChange', function(response) {
        $rootScope.$broadcast("fb_statusChange", {'status': response.status});
      });

    };

    (function(d){

      var js,
        id = 'facebook-jssdk',
        ref = d.getElementsByTagName('script')[0];

      if (d.getElementById(id)) {
        return;
      }

      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";

      ref.parentNode.insertBefore(js, ref);

    }(document));

  }]).config(function($mdThemingProvider, $mdIconProvider){
      $mdIconProvider
        .defaultIconSet("./assets/svg/avatars.svg", 128)
        .icon("menu"       , "./assets/svg/menu.svg"        , 24)
        .icon("share"      , "./assets/svg/share.svg"       , 24)
        .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
        .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
        .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
        .icon("phone"      , "./assets/svg/phone.svg"       , 512);
      $mdThemingProvider.theme('default')
        .primaryPalette('deep-purple')
        .accentPalette('purple');
})
  .config(function ($routeProvider) {
        $routeProvider
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'loginCtrl'
        })
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          })
          .when('/restricted', {
            templateUrl: 'views/restricted.html',
            controller: 'RestrictedCtrl',
            access : {
              requiresLogin : true
            }
          })
          .otherwise({
            redirectTo: '/'
          });
  }).config(function($httpProvider){
      $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
        return {
          'request': function (config) {
            config.headers = config.headers || {};
            config.headers.Accept = 'Content-Type :'+ "application/json";
            return config;
          },
          'responseError': function (response) {
            if (response.status === 401 || response.status === 403) {
              $location.path('/login');
            }
            return $q.reject(response);
          }
        };
  }]);
}).run(['$rootScope', '$location', 'UserService', function ($rootScope, $location, UserService) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (next.access !== undefined && next.access.requiresLogin) {
        if(!UserService.isLoggedIn)
          $location.path("/login");
      }
    });
  }]);;
