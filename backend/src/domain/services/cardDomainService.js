const cardRepository = require('../../infrastructure/repositories/cardRepository');

module.exports = {
    createCard: async function (cardData) {
        cardRepository.createCard(cardData);
    },
    getAllCards: async function () {
        return cardRepository.getAllCards();
    },
    getQuizzCards: async function (date) {
        return cardRepository.getQuizzCards(date);
    },
    answerCard: async function (cardId, isValid) {
        const card = await cardRepository.findCardById(cardId);
        if (!card) {
            throw new Error('Card not found');
        }

        if (isValid) {
            card.category = this.nextCategory(card.category);
        } else {
            card.category = 'FIRST';
        }
        card.lastReviewed = new Date();
        return cardRepository.updateCard(cardId, card);

    },
    nextCategory: function (currentCategory) {
        const categories = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE'];
        const currentIndex = categories.indexOf(currentCategory);
        if (currentIndex === -1 || currentIndex === categories.length - 1) {
            return 'DONE';
        }
        return categories[currentIndex + 1];

    }

};
