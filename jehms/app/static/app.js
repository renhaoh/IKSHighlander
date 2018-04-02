
// Declare app level module which depends on views, and components
var app = angular.module('app', [
  'ngRoute',
  'angular-blocks',
  'ui.materialize'
]);

app.controller("landing_ctl", landing_ctl);
app.controller("charts_ctl", charts_ctl);
app.controller("general_data_ctl", general_data_ctl);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
      templateUrl: "html/landing.html",
      controller: "landing_ctl"
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