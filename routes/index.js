const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/accounts', require('./accounts'));

module.exports = router;
