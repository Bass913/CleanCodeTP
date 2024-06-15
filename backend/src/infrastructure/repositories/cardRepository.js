const CardModel = require('../../domain/models/card');

module.exports = {
    createCard: async function (cardDate) {
        CardModel.create(cardData);
    },
    getAllCards: async function () {
        return CardModel.find();
    },
    getQuizzCards: async function (date) {
        const today = new Date(date || Date.now());
        const categories = [
            { name: 'FIRST', days: 1 },
            { name: 'SECOND', days: 2 },
            { name: 'THIRD', days: 4 },
            { name: 'FOURTH', days: 8 },
            { name: 'FIFTH', days: 16 },
            { name: 'SIXTH', days: 32 },
            { name: 'SEVENTH', days: 64 }
        ];

        const conditions = categories.map(category => {
            const targetDate = new Date(today.getTime() - (category.days * 24 * 60 * 60 * 1000));
            return {
                lastReviewed: { $lte: targetDate },
                category: category.name
            };
        });
        return CardModel.find({ $or: conditions });
    },
    findCardById: async function (cardId) {
        return CardModel.findById(cardId);
    },
    updateCard: async function (cardId, cardData) {
        return CardModel.findByIdAndUpdate(cardId, cardData, { new: true });
    }
};
