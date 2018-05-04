var post_survey_ctl = ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http) {
	$scope.name = "post_survey";
	$scope.responses = [];

	$scope.get_all = function () {
		$http.get("/api/post/get_all").then(function(success) {
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

	$scope.populate = function (r) {
		var payload = {
			row: r
		}
		$http.post("/api/post/populate", payload).then(function(success) {
			$scope.responses.push(success.data[0])
		}, function(fail) {
			Materialize.toast('Failed inserting data', 5000);
		});
	}

	$scope.strToBool = function (s) {
		if(s.toLowerCase() === "yes") return true;
		else return false;
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
			newRow.push(row[4]);

			for(var c=5; c<8; c++) {
				newRow.push(row[c]);
			}

			newRow.push(parseInt(row[8]));
			newRow.push(parseInt(row[9]));
			newRow.push(parseInt(row[10]));

			for(var c=11; c<16; c++) {
				newRow.push(row[c]);
			}
			newRow.push($scope.strToBool(row[16]));
			newRow.push($scope.strToBool(row[17]));
			for(var c=18; c<21; c++) {
				newRow.push(row[c]);
			}
			newRow.push($scope.strToBool(row[21]));
			newRow.push($scope.strToBool(row[22]));
			for(var c=23; c<26; c++) {
				newRow.push(row[c]);
			}
			newRow.push($scope.strToBool(row[26]));
			for(var c=27; c<29; c++) {
				newRow.push(row[c]);
			}
			newRow.push($scope.strToBool(row[29]));
			newRow.push(row[30]);
			newRow.push($scope.strToBool(row[31]));
			newRow.push(row[32]);
			newRow.push(parseInt(row[33]));
			newRow.push(row[34]);
			newRow.push(row[35]);
			res.push(newRow);
			$scope.populate(newRow);
		}
		
		return res;
	}

	$scope.submit_res = function (responses) {
		$http.delete("/api/post/clear");
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
		var tsv = "time\tstudent_id\tgrade_level\tmission\tmission_favorite\teasiest\tmost_difficult\timprove_suggestion\tcommunicate_score\tcommunicate_score_others\ttrust_others\ttrust_examples\tproblem_solve_skills\tcreate_solution\tpersonality_traits\tteamwork_comp_rate\tjob_first_choice\tjob_first_choice_get\tjob_first_choice_learn\tjob_first_choice_learn_why\tjob_first_choice_other_roles\tjob_first_choice_skills\tjob_first_choice_pressure\tjob_first_choice_pressure_why\tjob_first_choice_critical\tjob_first_choice_critical_why\tjob_second_choice_affect\tjob_second_choice_affect_why\tjob_second_choice_other_roles\tjob_second_choice_skills\tjob_second_choice_pressure\tjob_second_choice_pressure_why\tjob_second_choice_critical\tjob_second_choice_critical_why\texamples_tie_class\tsomething_new\n";

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