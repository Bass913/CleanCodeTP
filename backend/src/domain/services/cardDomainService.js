const cardRepository = require('../../infrastructure/repositories/cardRepository');

module.exports = {
    createCard: async function (card) {
        cardRepository.save(card);
    },
    getCards: async function () {
        return cardRepository.findAll();
    }
};
