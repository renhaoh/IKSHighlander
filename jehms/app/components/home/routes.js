var router = require('express').Router();
var tableName = 'responses'
var validate = require('express-jsonschema').validate;
var db = require('../../db');
var tools = require('./parse.js');
var exec = require('child_process').exec;

// Get all student responses
router.get('/get_all', function(req, res, next) {
  return db.select('*')
  .from(tableName)
  .orderBy('id')
  .then(function(responses) {
    return res.send(responses);
  })
  .catch(function(err) {
    if (err.name === 'GetCoursesException') {
      return res.status(400).send(err);
    } else {
      next(err);
    }
  });
});

// Generate the word cloud, which will be wordcloud/cloud.png
router.get('/word_cloud', function(req, res, next) {
	exec('./script.sh', function(err, stdout, stderr) {
		console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    } else {
    	return res.send('written to wordlcoud/cloud.png')
    }
	});
});

// Get a particular student's responses
router.get('/get_all', function(req, res, next) {
	var id = req.query.id;
  return db.select('*')
  .from(tableName)
  .where('id', id);
  .orderBy('time', 'desc');
  .then(function(responses) {
    return res.send(responses);
  })
  .catch(function(err) {
    if (err.name === 'GetCoursesException') {
      return res.status(400).send(err);
    } else {
      next(err);
    }
  });
});

// Get student responses with a query dependent on paramters for the cols defined in the cols variable
router.get('/get_match', function(req, res, next) {
	var mission = req.query.mission;
	var num = req.query.num;
	var gradeVal = req.query.grade;
	var missionEmpty = Object.keys(mission).length === 0 && mission.constructor === Object;
	var gradeEmpty = Object.keys(gradeVal).length === 0 && gradeVal.constructor === Object;
	if (missionEmpty) {
		mission = '%';
	}
	if (gradeEmpty) {
		grade = [6, 8];
	} else {
		grade = [gradeVal, gradeVal];
	}
	return db.select('*')
  .from(tableName)
  .where('mission', mission);
  .whereBetween('grade', grade);
  .orderBy('time', 'desc')
  .then(function(rows) {
  	var colVals = {};
  	// cols should only contain values that we want to display on the webpage to reduce calculation time
  	var cols = [8, 11, 12, 13, 14, 19, 21, 40, 41];
  	for (var i = 0; i < rows.length; i++) {
    	var element = rows[i];
    	for (var j = 0; j < cols.length; j++) {
    		var specCol = cols[j];
    		var str = element[specCol];
    		if !(specCol in colVals) {
    			colVals[specCol] = str;
    		} else {
    			colVals[specCol] = colVals[specCol] + str;
    		}
    	}
		}

		var response = {};
		for (var key in colVals) {
			response[key] = calculateTopVals(colVals[key], num);
		}
		return res.send(response);
  })
  .catch(function(err) {
    if (err.name === 'GetMatchesException') {
      return res.status(400).send(err);
    } else {
      next(err);
    }
  });
}); 