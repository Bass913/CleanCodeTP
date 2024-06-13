const express = require('express');

const cardController = require('../controllers/card');

const router = express.Router();

router.get('/', cardController.findAll);

router.post(
    '/',
    cardController.create,
);

module.exports = router;
