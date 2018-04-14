var home_ctl = ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http) {
	$scope.name = "home";

	$scope.get_all_responses = function () {
		$http.get("/api/home/get_all").then(function(success) {
			$scope.responses = success.data;
		}, function(fail) {
			Materialize.toast('Error getting responses', 5000);
		});
	}
	$scope.get_all_responses();
}];