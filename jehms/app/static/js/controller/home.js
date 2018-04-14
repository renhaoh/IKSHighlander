var home_ctl = ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http) {
	$scope.name = "home";

	$scope.get_all_responses = function () {
		$http.get("/api/home/word_cloud").then(function(success) {
			$scope.responses = success.data;
		}, function(fail) {
			Materialize.toast('Error getting word cloud', 5000);
		});
	}
	$scope.get_all_responses();
}];