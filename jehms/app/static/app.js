
// Declare app level module which depends on views, and components
var app = angular.module('app', [
  'ngRoute',
  'angular-blocks',
  'ui.materialize'
]);

// Register controllers
app.controller("login_ctl", login_ctl);
app.controller("home_ctl", home_ctl);
app.controller("charts_ctl", charts_ctl);
app.controller("pre_survey_ctl", pre_survey_ctl);
app.controller("post_survey_ctl", post_survey_ctl);

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
  $routeProvider.when("/post_survey", {
      templateUrl: "html/post_survey.html",
      controller: "post_survey_ctl"
  });
  $routeProvider.when("/pre_survey", {
      templateUrl: "html/pre_survey.html",
      controller: "pre_survey_ctl"
  }).otherwise({ redirectTo: '/'}); // catch other routes, reroute to login page
});