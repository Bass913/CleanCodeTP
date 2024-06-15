const cardDomainService = require('../domain/services/cardDomainService');
const { getQuizCards } = require('../infrastructure/repositories/cardRepository');

module.exports = {
    createCard: async function (cardData) {
        cardDomainService.createCard(cardData);
    },
    getCards: async function () {
        return cardDomainService.getAllCards();
    },
    getQuizzCards: async function (date) {
        return cardDomainService.getQuizzCards(date);
    },
    answerCard: async function (cardId, isValid) {
        return cardDomainService.answerCard(cardId, isValid);
    }
};
