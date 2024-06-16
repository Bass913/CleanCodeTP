import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
});


apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API call error:", error);
        return Promise.reject(error);
    }
);

const apiService = {

    getCards(tags) {
        return apiClient.get(`/cards?tags=${tags}`);
    },

    getQuizzCards(date) {
        return apiClient.get(`/cards/quizz?date=${date}`);
    },

    createCard(card) {
        apiClient.post("/cards/", card);
    },

    answerCard(cardId, isValid) {
        apiClient.patch(`/cards/${cardId}/answer`, {
            isValid: isValid
        });
    },
};

export default apiService;
