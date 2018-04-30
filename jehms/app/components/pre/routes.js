var router = require('express').Router();
var validate = require('express-jsonschema').validate;
var pre = 'pre_responses';

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

module.exports = router;