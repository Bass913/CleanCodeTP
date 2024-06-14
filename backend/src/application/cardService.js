const cardDomainService = require('../domain/services/cardDomainService');

module.exports = {
    createCard: async function (card) {
        cardDomainService.createCard(card);
    },
    getCards: async function () {
        return cardDomainService.getCards();
    }
};
