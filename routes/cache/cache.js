const express = require('express');
const { create, getAll, getOne } = require('../../controllers/cache');
const { createSchema } = require('./validators/cacheValidator');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});
router.get('/cache', getAll);
router.get('/cache/:key', getOne);
// router.put('/cache/:key', createOrUpdate);

module.exports = router;
