// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

// var app = angular.module('Simplegram', ['ionic'])

//   .config(function($compileProvider) {
//     $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
//   })


//   ;
document.addEventListener("deviceready", function onDeviceReady() {
        angular.bootstrap(document, ["Simplegram"]);
        }, false);

var app = angular.module("Simplegram", ["ionic"]);

app.config(["$compileProvider", function($compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

  // $routeProvider
  //   .when("/", {
  //     templateUrl: "index.html",
  //     controller: "CameraCtrl",
  //   })
  //   .when("/map", {
  //     templateUrl: "map.html",
  //     controller: "MapCtrl"
  //   })
  //   .otherwise({
  //     redirectTo: "/"
  //   });
}]);



// app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
//   var jsScrolling = (ionic.Platform.isAndroid() ) ? false : true;
//   $ionicConfigProvider.scrolling.jsScrolling(jsScrolling);
// });


