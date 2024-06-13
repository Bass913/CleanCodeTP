const Card = require('../../domain/models/card');


module.exports = async function createCard(card) {
    await Card.create(card);
}
