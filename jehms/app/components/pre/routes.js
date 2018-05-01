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
	return db.del().from('pre_responses').then(function (count) {
		console.log("from delete", count);
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
	console.log("from populate", req.body);	
	return db.insert(req.body)
			 .into(pre)
			 .returning('*')
			 .then(function (success) {
			 	return res.send(success);
			 });
})

module.exports = router;