var pre_survey_ctl = ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http) {
	$scope.name = "pre_survey";
	$scope.responses = [];

	$scope.get_all = function () {
		$http.get("/api/pre/get_all").then(function(success) {
			$scope.responses = success.data;
		}, function(fail) {
			Materialize.toast('Error getting responses', 5000);
		});
	}
	$scope.get_all();
	
	$scope.update_query = function () {
		var new_responses = [];
		for(var i=0; i<$scope.responses.length; i++) {
			if($scope.responses[i].student_id.toString().includes($scope.search)) {
				new_responses.push($scope.responses[i])
			}
		}
		$scope.responses = new_responses;
	}
	$scope.in_search = function (response) {
		if(typeof $scope.search !== "undefined") {
			var keys = Object.keys(response);
			for(var i=0; i<(keys.length-1); i++) {
				var key = keys[i];
				if(typeof response[key] !== "string") {
					if(response[key].toString().includes($scope.search)) return true;
				} else {
					if(response[key].includes($scope.search)) return true;
				}
			}
			return false;
		} else return true;
	}

	$scope.populate = function (r) {
		var payload = {
			row: r
		}
		$http.post("/api/pre/populate", payload).then(function(success) {
			$scope.responses.push(success.data[0])
		}, function(fail) {
			Materialize.toast('Failed inserting data', 5000);
		});
	}

	$scope.parse_pop = function (raw) {
		var res = [];
		for(var i=1; i<raw.length; i++) {
			if(raw[i].length < 5) continue;

			var row = raw[i].split("\t");
			var newRow = [];

			// newRow.push(row[0].replace("/\//", "-"));
			newRow.push(row[0]);

			var cleanID = row[1].replace(/[^0-9\.]+/g, "");
			if(cleanID != "") {
				newRow.push(parseInt(cleanID));
			} else {
				newRow.push(0);
			}

			newRow.push(parseInt(row[2][0]));
			newRow.push(row[3]);
			newRow.push(parseInt(row[4]));

			for(var c=5; c<10; c++) {
				newRow.push(row[c]);
			}

			if (row[10].toLowerCase() == "yes") newRow.push(true); 
			else newRow.push(false);

			res.push(newRow);
			$scope.populate(newRow);
		}
		
		return res;
	}

	$scope.submit_res = function (responses) {
		$http.delete("/api/pre/clear");
		$scope.responses = [];
		$scope.clean = $scope.parse_pop(responses);
		$scope.get_all();
	}

	$scope.reload_responses = function () {
		var input, file, fr, result;
		input = document.getElementById('csv_input');
		file = input.files[0]
		fr = new FileReader();
		fr.onload = function(e) {
			$scope.submit_res(e.target.result.split("\n"));
		}
		fr.readAsText(file);
	}

	$scope.responses_to_tsv = function () {
		var rs = $scope.responses;
		var tsv = "time\tstudent_id\tgrade_level\tmission\tpre_mission_score\tpre_job_role\tpre_job_why\tpre_job_skills\tpre_personality\tpre_excited\tpre_mission_jitters\n";

		for(var row=0; row<rs.length; row++) {
			var keys = Object.keys(rs[row]);
			console.log(keys);
			for(var i=0; i<(keys.length-1); i++) {
				var key = keys[i];
				if(typeof rs[row][key] !== "string") {
					tsv += rs[row][key].toString() + "\t";
				} else {
					tsv += rs[row][key] + "\t";
				}
				
			}
			tsv += "\n";
		}
		var encodedUri = encodeURIComponent(tsv);
		window.location.href = "data:text/tab-separated-values," + encodedUri;
	}
}];