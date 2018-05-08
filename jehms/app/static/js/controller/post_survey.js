var post_survey_ctl = ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http) {
	$scope.name = "post_survey";
	$scope.responses = [];

	// Get all post survey responses
	$scope.get_all = function () {
		$http.get("/api/post/get_all").then(function(success) {
			$scope.responses = success.data;
		}, function(fail) {
			Materialize.toast('Error getting responses', 5000);
		});
	}
	$scope.get_all();

	// Filter response if search query string does not appear in any field
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

	// Insert row into DB
	$scope.populate = function (r) {
		// make object wrapper
		var payload = {
			row: r
		}

		$http.post("/api/post/populate", payload).then(function(success) {
			// reflect new row
			$scope.responses.push(success.data[0])
		}, function(fail) {
			Materialize.toast('Failed inserting data', 5000);
		});
	}

	// "yes" -> true
	// "no" -> false
	// "" -> false
	$scope.str_to_bool = function (s) {
		if(s.toLowerCase() === "yes") return true;
		else return false;
	}

	// From Google Sheet TSV to array of data
	$scope.parse_pop = function (raw) {
		var res = [];
		for(var i=1; i<raw.length; i++) {
			if(raw[i].length < 5) continue; // catch new lines/poorly formatted lines

			var row = raw[i].split("\t");
			var newRow = [];

			newRow.push(row[0]); // date
			var cleanID = row[1].replace(/[^0-9\.]+/g, ""); // id
			if(cleanID != "") {
				newRow.push(parseInt(cleanID));
			} else {
				// can't get readable id, convert to 0
				// note: do not use for student lookup
				newRow.push(0);
			}
			newRow.push(parseInt(row[2][0])); // read int out of grade
			for(var c=3; c<8; c++) { // mission - improvements
				newRow.push(row[c]);
			}
			newRow.push(parseInt(row[8])); // communication score
			newRow.push(parseInt(row[9])); // commuincation w/ others score
			newRow.push(parseInt(row[10])); // trust score
			for(var c=11; c<16; c++) { // trust ex. - job first choice
				newRow.push(row[c]);
			}
			newRow.push($scope.str_to_bool(row[16])); // get first job
			newRow.push($scope.str_to_bool(row[17])); // first job learn
			for(var c=18; c<21; c++) { // first job why - skills
				newRow.push(row[c]);
			}
			newRow.push($scope.str_to_bool(row[21])); // first pressure
			newRow.push($scope.str_to_bool(row[22])); // second choice afffect
			for(var c=23; c<26; c++) { // second job why - skills
				newRow.push(row[c]);
			}
			newRow.push($scope.str_to_bool(row[26])); // second pressure why
			for(var c=27; c<29; c++) { // examplies tie - something new
				newRow.push(row[c]);
			}
			newRow.push($scope.str_to_bool(row[29])); // first critical why
			newRow.push(row[30]); // first critical why
			newRow.push($scope.str_to_bool(row[31])); // second critical why
			newRow.push(row[32]); // second critical why
			newRow.push(parseInt(row[33])); // teamwork comp rate
			newRow.push(row[34]); // first pressure why
			newRow.push(row[35]); // second pressure why

			res.push(newRow);
			$scope.populate(newRow);
		}
		
		return res;
	}

	// clear table then repopulate with new tsv
	$scope.submit_res = function (responses) {
		$http.delete("/api/post/clear");
		$scope.responses = [];
		$scope.clean = $scope.parse_pop(responses);
		$scope.get_all(); // reset responses to reflect new data
	}

	// read from tsv
	$scope.reload_responses = function () {
		var input, file, fr, result;
		input = document.getElementById('csv_input');
		file = input.files[0] // extract from FileList
		fr = new FileReader();
		fr.onload = function(e) { // once done with reading, submit
			$scope.submit_res(e.target.result.split("\n"));
		}
		fr.readAsText(file);
	}

	// stored data -> tsv
	$scope.responses_to_tsv = function () {
		var rs = $scope.responses;
		var tsv = "time\tstudent_id\tgrade_level\tmission\tmission_favorite\teasiest\tmost_difficult\timprove_suggestion\tcommunicate_score\tcommunicate_score_others\ttrust_others\ttrust_examples\tproblem_solve_skills\tcreate_solution\tpersonality_traits\tteamwork_comp_rate\tjob_first_choice\tjob_first_choice_get\tjob_first_choice_learn\tjob_first_choice_learn_why\tjob_first_choice_other_roles\tjob_first_choice_skills\tjob_first_choice_pressure\tjob_first_choice_pressure_why\tjob_first_choice_critical\tjob_first_choice_critical_why\tjob_second_choice_affect\tjob_second_choice_affect_why\tjob_second_choice_other_roles\tjob_second_choice_skills\tjob_second_choice_pressure\tjob_second_choice_pressure_why\tjob_second_choice_critical\tjob_second_choice_critical_why\texamples_tie_class\tsomething_new\n";
		// append responses to tsv
		for(var row=0; row<rs.length; row++) {
			var keys = Object.keys(rs[row]);
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