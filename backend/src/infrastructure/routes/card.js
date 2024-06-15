const express = require('express');

const cardController = require('../controllers/cardController');

const router = express.Router();

router.get('/', cardController.getCards);

router.post('/',cardController.createCard);
router.get('/quizz', cardController.getQuizzCards);
router.patch('/:cardId/answer', cardController.answerCard);

module.exports = router;
