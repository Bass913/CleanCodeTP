import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import Card from '../components/Card';


export default function MyCardsPage() {

    const [cards, setCards] = useState([]);
    const [tags, setTags] = useState("");


    async function getCards(tags) {
        try {
            const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
            const response = await apiService.getCards(tagsArray);
            setCards(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleTagChange = (e) => {
        setTags(e.target.value);
    };

    const handleSearch = () => {
        getCards(tags);
    };


    return (
        <>
            <div className='w-1/4 mt-10 m-auto'>
                <h1 className='mb-2'>Rechercher par tag(s) :</h1>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Exemple: tag1,tag2" onChange={handleTagChange}
                    />
                    <button onClick={handleSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                        </svg>
                    </button>                </label>
            </div>
            <div className='mx-20 flex gap-10 items-center h-2/4'>
                {cards.map(card => (
                    <Card
                        key={card._id}
                        category={card.category}
                        question={card.question}
                        tag={card.tag}
                        actualAnswer={card.answer}
                        cardId={card._id}
                    />
                ))}
            </div>
        </>

    );
}
