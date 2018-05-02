var router = require('express').Router();
var validate = require('express-jsonschema').validate;
var pre = 'pre_responses';
var db = require('../../db');


// Get all pre survey student responses
router.get('/get_all', function(req, res, next) {
  return db.select('*')
  .from(pre)
  .orderBy('id')
  .then(function(responses) {
    return res.send(responses);
  })
  .catch(function(err) {
      return res.status(400).send(err);
  });
});

router.delete('/clear', function(req, res, next) {
	return db.del().from(pre).then(function (count) {
		return res.sendStatus(200);
	});
});

var preSchema = {
	type: 'object',
	additionalProperties: false,
	properties: {
		rows: {
		  type: 'array',
		  required: true,
		}
	}
}

router.post('/populate', function(req, res, next) {
	var row = req.body.row;
	var payload = {
		time: row[0],
		student_id: row[1],
		grade_level: row[2],
		mission: row[3],
		pre_mission_score: row[4],
		pre_job_role: row[5],
		pre_job_why: row[6],
		pre_job_skills: row[7],
		pre_personality: row[8],
		pre_excited: row[9],
		pre_mission_jitters: row[10]
	}	
	return db.insert(payload)
			 .into(pre)
			 .returning('*')
			 .then(function (success) {
			 	return res.send(success);
			 });
})

module.exports = router;