
// Declare app level module which depends on views, and components
var app = angular.module('app', [
  'ngRoute',
  'angular-blocks',
  'ui.materialize'
]);

// Register global methods for authentication check
app.factory("$globs", globs);

// Register controllers
app.controller("login_ctl", login_ctl);
app.controller("home_ctl", home_ctl);
app.controller("charts_ctl", charts_ctl);
app.controller("general_data_ctl", general_data_ctl);

// Register routes with respective templates and controllers
app.config(function($routeProvider) {
	$routeProvider.when("/", {
      templateUrl: "html/login.html",
      controller: "login_ctl"
  });
  $routeProvider.when("/home", {
      templateUrl: "html/home.html",
      controller: "home_ctl"
  });
  $routeProvider.when("/charts", {
      templateUrl: "html/charts.html",
      controller: "charts_ctl"
  });
  $routeProvider.when("/general_data", {
      templateUrl: "html/general_data.html",
      controller: "general_data_ctl"
  }).otherwise({ redirectTo: '/'});
});