var pre_survey_ctl = ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http) {
	$scope.name = "pre_survey";
	$scope.responses = [];

	// get all pre survey responses
	$scope.get_all = function () {
		$http.get("/api/pre/get_all").then(function(success) {
			$scope.responses = success.data;
		}, function(fail) {
			Materialize.toast('Error getting responses', 5000);
		});
	}
	$scope.get_all();
	
	// filter response if search query string does not appear in any field
	$scope.in_search = function (response) {
		if(typeof $scope.search !== "undefined") {
			var keys = Object.keys(response);
			for(var i=0; i<(keys.length-1); i++) {
				var key = keys[i];
				var search_lower = $scope.search.toLowerCase();
				if(typeof response[key] !== "string") {
					var res_lower = response[key].toString().toLowerCase();
					if(res_lower.includes(search_lower)) return true;
				} else {
					var res_lower = response[key].toLowerCase();
					if(res_lower.includes(search_lower)) return true;
				}
			}
			return false;
		} else return true;
	}

	// insert row into db
	$scope.populate = function (r) {
		// object wrapper
		var payload = {
			row: r
		}

		$http.post("/api/pre/populate", payload).then(function(success) {
			// reflect new row
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

			newRow.push(row[0]); // date
			var cleanID = row[1].replace(/[^0-9\.]+/g, ""); // id
			if(cleanID != "") {
				newRow.push(parseInt(cleanID));
			} else {
				// can't get readable id, convert to 0
				// do not use for student lookup
				newRow.push(0);
			}
			newRow.push(parseInt(row[2][0])); // read int out of grade
			newRow.push(row[3]); // mission
			newRow.push(parseInt(row[4])); // pre mission score
			for(var c=5; c<10; c++) { // why - excited
				newRow.push(row[c]);
			}
			if (row[10].toLowerCase() == "yes") newRow.push(true); // jitters
			else newRow.push(false);

			res.push(newRow);
			$scope.populate(newRow);
		}
		
		return res;
	}

	// clear table then repopulate with new tsv
	$scope.submit_res = function (responses) {
		$http.delete("/api/pre/clear");
		$scope.responses = [];
		$scope.clean = $scope.parse_pop(responses);
		$scope.get_all();
	}

	// read from tsv
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

	// stored data -> tsv
	$scope.responses_to_tsv = function () {
		var rs = $scope.responses;
		var tsv = "time\tstudent_id\tgrade_level\tmission\tpre_mission_score\tpre_job_role\tpre_job_why\tpre_job_skills\tpre_personality\tpre_excited\tpre_mission_jitters\n";
		// append responses to tsv
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
		// encode as tsv and attach file
		window.location.href = "data:text/tab-separated-values," + encodedUri;
	}
}];