const CardModel = require('../../domain/models/card');

module.exports = {
    createCard: async function (cardData) {
        CardModel.create(cardData);
    },
    getAllCards: async function () {
        return CardModel.find();
    },
    getCardsByTag: async function (tags) {
        const tagConditions = tags.map(tag => new RegExp(`^${tag}$`, 'i'));
        return CardModel.find({ tag: { $in: tagConditions } });
    },
    getQuizzCards: async function (date) {

        const today = new Date(date || Date.now());
        today.setHours(0, 0, 0, 0);

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
            const targetDate = new Date(today);
            targetDate.setDate(today.getDate() - category.days + 1);
            targetDate.setHours(0, 0, 0, 0);
            return {
                category: category.name,
                $or: [
                    { lastReviewed: null },
                    { lastReviewed: { $lte: targetDate } }
                ]
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
