const cardController = require('../src/infrastructure/controllers/cardController');
const cardService = require('../src/application/cardService');

jest.mock('../src/application/cardService');

describe('Card Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            sendStatus: jest.fn()
        };
        next = jest.fn();
    });

    describe('createCard', () => {
        it('should return 400 if validation fails', async () => {
            req.body = { question: '', answer: 'Valid answer' };
            await cardController.createCard(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or missing question' });
        });

        it('should create a card and return 201', async () => {
            req.body = { question: 'Valid question', answer: 'Valid answer' };
            cardService.createCard.mockResolvedValue();
            await cardController.createCard(req, res, next);
            expect(cardService.createCard).toHaveBeenCalledWith(req.body);
            expect(res.sendStatus).toHaveBeenCalledWith(201);
        });

        it('should call next with error if createCard fails', async () => {
            const error = new Error('Test error');
            req.body = { question: 'Valid question', answer: 'Valid answer' };
            cardService.createCard.mockRejectedValue(error);
            await cardController.createCard(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getCards', () => {
        it('should return cards with status 200', async () => {
            const cards = [{ question: 'question1', answer: 'answer1' }];
            req.query = {};
            cardService.getCards.mockResolvedValue(cards);
            await cardController.getCards(req, res, next);
            expect(cardService.getCards).toHaveBeenCalledWith(null);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(cards);
        });

        it('should call next with error if getCards fails', async () => {
            const error = new Error('Test error');
            req.query = {};
            cardService.getCards.mockRejectedValue(error);
            await cardController.getCards(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getQuizzCards', () => {
        it('should return quiz cards with status 200', async () => {
            const cards = [{ question: 'question1', answer: 'answer1' }];
            req.query = { date: '2024-06-16' };
            cardService.getQuizzCards.mockResolvedValue(cards);
            await cardController.getQuizzCards(req, res, next);
            expect(cardService.getQuizzCards).toHaveBeenCalledWith(req.query.date);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(cards);
        });

        it('should call next with error if getQuizzCards fails', async () => {
            const error = new Error('Test error');
            req.query = { date: '2024-06-16' };
            cardService.getQuizzCards.mockRejectedValue(error);
            await cardController.getQuizzCards(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('answerCard', () => {
        it('should return 400 if isValid is not boolean', async () => {
            req.params = { cardId: '1' };
            req.body = { isValid: 'not boolean' };
            await cardController.answerCard(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Bad request. Make sur that isValid is a boolean.' });
        });

        it('should return 404 if card not found', async () => {
            req.params = { cardId: '1' };
            req.body = { isValid: true };
            cardService.answerCard.mockResolvedValue(null);
            await cardController.answerCard(req, res, next);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Card not found' });
        });

        it('should return 204 if card answered successfully', async () => {
            req.params = { cardId: '1' };
            req.body = { isValid: true };
            cardService.answerCard.mockResolvedValue({});
            await cardController.answerCard(req, res, next);
            expect(cardService.answerCard).toHaveBeenCalledWith(req.params.cardId, req.body.isValid);
            expect(res.sendStatus).toHaveBeenCalledWith(204);
        });

        it('should call next with error if answerCard fails', async () => {
            const error = new Error('Test error');
            req.params = { cardId: '1' };
            req.body = { isValid: true };
            cardService.answerCard.mockRejectedValue(error);
            await cardController.answerCard(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
