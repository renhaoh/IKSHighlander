var home_ctl = ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http) {
	$scope.name = "home";

	// $scope.get_all_responses = function () {
	// 	$http.get("/api/home/word_cloud").then(function(success) {
	// 		$scope.responses = success.data;
	// 	}, function(fail) {
	// 		Materialize.toast('Error getting word cloud', 5000);
	// 	});
	// }

	// $scope.get_all_responses();
	$scope.get_pre_count = function () {
		$http.get("/api/pre/count").then(function(success) {
			$scope.pre_count = parseInt(success.data[0]["count"]);
			$scope.total_count = $scope.pre_count + $scope.post_count
		}, function(fail) {
			Materialize.toast('Error getting pre count', 5000);
		});
	}

	$scope.get_post_count = function () {
		$http.get("/api/post/count").then(function(success) {
			$scope.post_count = parseInt(success.data[0]["count"]);
			$scope.get_pre_count();
		}, function(fail) {
			Materialize.toast('Error getting post count', 5000);
		});
	}
	$scope.get_post_count();

}];