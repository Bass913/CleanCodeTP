const createCard = require('../../application/use-cases/createCardUseCase');
const findAllCards = require('../../application/use-cases/getCardsUseCase');

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

exports.create = async (req, res, next) => {
    try {
        const validationError = validateCardData(req.body);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        await createCard(req.body);
        res.sendStatus(201);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const cards = await findAllCards();
        res.status(200).json(cards);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
