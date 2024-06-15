const CardModel = require('../../domain/models/card');

module.exports = {
    createCard: async function (cardData) {
        CardModel.create(cardData);
    },
    getAllCards: async function () {
        return CardModel.find();
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
            targetDate.setDate(today.getDate() - category.days);
            return {
                category: category.name,
                $or: [
                    { lastReviewed: null },
                    {
                        $expr: {
                            $and: [
                                { $lte: [{ $year: "$lastReviewed" }, targetDate.getFullYear()] },
                                { $lte: [{ $month: "$lastReviewed" }, targetDate.getMonth() + 1] },
                                { $lte: [{ $dayOfMonth: "$lastReviewed" }, targetDate.getDate()] }
                            ]
                        }
                    }
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
