import { useState } from 'react';
import axios from 'axios';


export default function Card({ category, question, tag, actualAnswer, cardId }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [answer, setAnswer] = useState('');
    const [isValid, setIsValid] = useState(false);


    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleInputChange = (e) => {
        setAnswer(e.target.value);
    };

    async function answerCard() {
        try {
            await axios.patch(`http://localhost:8080/cards/${cardId}/answer`, {
                isValid: isValid
            });
        } catch (error) {
            console.error(error);
        }
    }


    const handleSubmit = () => {
        if (answer === actualAnswer) {
            setIsValid(true);
            answerCard();
            alert("Bonne réponse!");
            setTimeout(() => {
                setAnswer('');
                setIsFlipped(false);
            }, 3000);
        } else {
            alert("Mauvaise réponse..");
            setTimeout(() => {
                setAnswer('');
                setIsFlipped(false);
            }, 3000);
        }
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
                    <button className="btn btn-primary w-36 mt-4" onClick={handleFlip} >Répondre</button>
                </div>
                {/* Back Side */}
                <div className={`absolute w-full backface-hidden bg-base-100 shadow-xl p-4 ${isFlipped ? 'block' : 'hidden'} transform rotate-y-180`}>
                    <input
                        type="text"
                        className="input input-bordered w-full mb-4"
                        value={answer}
                        onChange={handleInputChange}
                        placeholder="Votre réponse"
                    />
                    <button className="btn btn-primary w-full" onClick={handleSubmit}>Valider</button>
                </div>
            </div>
        </div>
    );
}
