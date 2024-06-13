const Card = require('../../domain/models/card');

exports.findAll = async (req, res, next) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

module.exports = async function findAllCards() {
    return await Card.find();
}