var pre_survey_ctl = ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http) {
	$scope.name = "pre_survey";

	$scope.get_all = function () {
		$http.get("/api/pre/get_all").then(function(success) {
			$scope.responses = success.data;
		}, function(fail) {
			Materialize.toast('Error getting responses', 5000);
		});
	}
	$scope.get_all();
	
}];