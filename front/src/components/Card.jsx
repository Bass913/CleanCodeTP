import { useState, useEffect } from 'react';
import apiService from '../services/apiService'; // Assurez-vous que le chemin est correct

export default function Card({ category, question, tag, actualAnswer, cardId }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [answer, setAnswer] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [confirmSubmit, setConfirmSubmit] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleInputChange = (e) => {
        setAnswer(e.target.value);
    };

    useEffect(() => {
        if (shouldSubmit) {
            answerCard();
            setShouldSubmit(false);
        }
    }, [shouldSubmit]);

    const answerCard = async () => {
        try {
            await apiService.answerCard(cardId, isValid);
            if (isValid) {
                alert("Bonne réponse!");
            } else {
                alert("Mauvaise réponse..");
            }
            resetCard();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = () => {
        const isAnswerValid = answer.toLowerCase() === actualAnswer.toLowerCase();
        setIsValid(isAnswerValid);

        if (isAnswerValid) {
            setShouldSubmit(true);
        } else {
            setShowCorrectAnswer(true);
        }
    };

    const handleConfirmSubmit = () => {
        setIsValid(true);
        setShowCorrectAnswer(false);
        setConfirmSubmit(true);
        setShouldSubmit(true);
    };

    const handleAcceptWrongAnswer = () => {
        setIsValid(false);
        setShowCorrectAnswer(false);
        setConfirmSubmit(true);
        setShouldSubmit(true);
    };

    const resetCard = () => {
        setAnswer('');
        setIsFlipped(false);
        setShowCorrectAnswer(false);
        setConfirmSubmit(false);
    };

    return (
        <div className="perspective-1000">
            <div className={`relative w-96 h-64 transition-transform duration-700 transform ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front Side */}
                <div className={`absolute w-full backface-hidden bg-base-100 shadow-xl p-4 ${isFlipped ? 'hidden' : 'block'}`}>
                    <h2 className="card-title">
                        <div className="badge badge-secondary">{category}</div>
                    </h2>
                    <div className="text-center mt-4">
                        <p>{question}</p>
                    </div>
                    <div className="card-actions justify-end mt-4">
                        <div className="badge badge-outline">{tag}</div>
                    </div>
                    <button className="btn btn-primary w-36 mt-4" onClick={handleFlip}>Répondre</button>
                </div>
                {/* Back Side */}
                <div className={`absolute w-full backface-hidden bg-base-100 shadow-xl p-4 ${isFlipped ? 'block' : 'hidden'} transform rotate-y-180`}>
                    <input
                        type="text"
                        className="input input-bordered w-full mb-4"
                        value={answer}
                        onChange={handleInputChange}
                        placeholder="Votre réponse"
                        disabled={showCorrectAnswer || confirmSubmit}
                    />
                    {!showCorrectAnswer && !confirmSubmit && (
                        <button className="btn btn-primary w-full" onClick={handleSubmit}>Valider</button>
                    )}
                    {showCorrectAnswer && (
                        <div>
                            <p className="text-red-500 mb-4">Mauvaise réponse. La bonne réponse est : {actualAnswer}</p>
                            <button className="btn btn-primary w-full mb-2" onClick={handleConfirmSubmit}>Forcer la validation</button>
                            <button className="btn btn-secondary w-full" onClick={handleAcceptWrongAnswer}>Envoyer mauvaise réponse</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
