const cardService = require('../../application/cardService');

function validateCardData(data) {
    const { question, answer, category } = data;
    if (!question || typeof question !== 'string') {
        return 'Invalid or missing question';
    }
    if (!answer || typeof answer !== 'string') {
        return 'Invalid or missing answer';
    }
    if (category && !['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE'].includes(category)) {
        return 'Invalid category';
    }
    return null;
}


module.exports = {
    createCard: async function (req, res, next) {
        try {
            const validationError = validateCardData(req.body);
            if (validationError) {
                return res.status(400).json({ message: validationError });
            }
            await cardService.createCard(req.body);
            res.sendStatus(201);
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
    getCards: async function (req, res, next) {
        try {
            const tags = req.query.tags ? req.query.tags.split(',') : null;
            const cards = await cardService.getCards(tags);
            res.status(200).json(cards);
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
    getQuizzCards: async function (req, res, next) {
        try {
            const cards = await cardService.getQuizzCards(req.query.date);
            res.status(200).json(cards);
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
    answerCard: async function (req, res, next) {
        try {
            const cardId = req.params.cardId;
            const { isValid } = req.body;
            if (typeof isValid !== "boolean") {
                return res.status(400).json({ message: "Bad request. Make sur that isValid is a boolean." });
            }
            const card = await cardService.answerCard(cardId, isValid);
            if (!card) {
                return res.status(404).json({ message: 'Card not found' });
            }
            res.sendStatus(204)

        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    }
};
