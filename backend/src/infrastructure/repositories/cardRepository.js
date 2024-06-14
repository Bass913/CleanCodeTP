const Card = require('../../domain/models/card');

module.exports = {
    save: async function (card) {
        Card.create(card);
    },
    findAll: async function () {
        return Card.find();
    }
};
