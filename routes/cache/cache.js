const express = require('express');
const {
  getAll,
  getOne,
  createOrUpdate,
  removeByKey,
  removeAll,
} = require('../../controllers/cache');
const {
  createSchema,
  bodySchema,
  paramSchema,
} = require('./validators/cacheValidator');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});
router.get('/cache', getAll);
router.delete('/cache', removeAll);
router.get('/cache/:key', getOne);
router.put(
  '/cache/:key',
  validator.body(bodySchema),
  validator.params(paramSchema),
  createOrUpdate
);
router.delete('/cache/:key', removeByKey);

module.exports = router;
