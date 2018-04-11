var globs = ["$rootScope","$http","$route","localStorageService",function ($rootScope,$http,$route,lss) {
	$rootScope.check_login = function () {
		$http.get('/api/user', {}).then(function (response) {
			// logged in, no need to redirect
		}, function() {
			if ($route.current.scope.name != "login") {
				window.location = "/#/";
				return;
			}
		});
	};
}];