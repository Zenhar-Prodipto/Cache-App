const express = require('express');
const { test } = require('../../controllers/cache');
const router = express.Router();

router.post('/cache', test);

module.exports = router;
