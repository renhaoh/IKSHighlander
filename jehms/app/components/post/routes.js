var router = require('express').Router();
var validate = require('express-jsonschema').validate;
var post = 'post_responses';
var db = require('../../db');


// Get all post survey student responses
router.get('/get_all', function(req, res, next) {
  return db.select('*')
  .from(post)
  .orderBy('id')
  .then(function(responses) {
    return res.send(responses);
  })
  .catch(function(err) {
      return res.status(400).send(err);
  });
});

// Delete all existsing pre survey student responses
router.delete('/clear', function(req, res, next) {
	return db.del().from(post).then(function (count) {
		return res.sendStatus(200);
	});
});


// Google Sheets api has a weird ordering for the responses.
// The ordering of the responses was changed to be more readable.
router.post('/populate', function(req, res, next) {
	var row = req.body.row;
	var payload = {
		time: row[0],
		student_id: row[1],
		grade_level: row[2],
		mission: row[3],
		mission_favorite: row[4],
		easiest: row[5],
		most_difficult: row[6],
		improve_suggestion: row[7],
		communicate_score: row[8],
		communicate_score_others: row[9],
		trust_others: row[10],
		trust_examples: row[11],
		problem_solve_skills: row[12],
		create_solution: row[13],
		personality_traits: row[14],
		teamwork_comp_rate: row[33], // ugh
		job_first_choice: row[15],
		job_first_choice_get: row[16],

		job_first_choice_learn: row[17],
		job_first_choice_learn_why: row[18],
		job_first_choice_other_roles: row[19],
		job_first_choice_skills: row[20],
		job_first_choice_pressure: row[21],
		job_first_choice_pressure_why: row[34],
		job_first_choice_critical: row[29],
		job_first_choice_critical_why: row[30],

		job_second_choice_affect: row[22],
		job_second_choice_affect_why: row[23],
		job_second_choice_other_roles: row[24],
		job_second_choice_skills: row[25],
		job_second_choice_pressure: row[26],
		job_second_choice_pressure_why: row[35],
		job_second_choice_critical: row[31],
		job_second_choice_critical_why: row[32],

		examples_tie_class: row[27],
		something_new: row[28]
	}	
	return db.insert(payload)
			 .into(post)
			 .returning('*')
			 .then(function (success) {
			 	return res.send(success);
			 });
});

// Get total number of responses in the post survey
router.get('/count', function(req, res, next) {
  return db.count('id')
  .from(post)
  .then(function(responses) {
    return res.send(responses);
  })
  .catch(function(err) {
      return res.status(400).send(err);
  });
});

module.exports = router;